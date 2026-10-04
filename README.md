# CentralKV: Compressing Long-Context LLMs via Attention-Graph Centrality

Official project page and supplementary materials for **CentralKV**, a training-free framework for compressing the key-value (KV) cache during long-context large language model inference.

## Overview

Long-context inference is limited by the linear memory growth of the KV cache. Existing eviction strategies often retain tokens with high accumulated attention or remove semantic redundancy. These policies can discard low-frequency tokens that connect distant dependencies in a multi-step reasoning chain.

CentralKV models attention as a dynamic sparse causal graph. Its **Stream-Influence** algorithm updates token centrality online and preserves structurally important bridge tokens during KV-cache compression. The graph is constructed directly from the attention operation, without a separate cosine-similarity computation or model retraining.

## Method

At each decoding step, CentralKV:

1. Reuses the attention weights produced by the forward pass.
2. Constructs a sparse graph from the top-k causal attention edges.
3. Updates token centrality with the online Stream-Influence rule.
4. Protects system prompts and the local window, then evicts the lowest-centrality cache entries when the budget is full.

This design targets **structural bridge tokens**: tokens whose direct attention mass may be small, but whose removal disrupts long-range information flow.

## Evaluation

We evaluate CentralKV on LongBench under a 20% logical KV-cache budget and report a separate strict physical-budget analysis. The project page includes the original paper tables for:

- LongBench evaluation across six task categories;
- detailed results across 18 LongBench datasets;
- strict physical budgeting on 2WikiMultihopQA.

The camera-ready paper also reports ablations, Needle In A Haystack evaluation, efficiency analysis, cross-model results, and the complete inference protocol.

## Links

- **Project page:** [https://sanmu-27.github.io/CentralKV-/](https://sanmu-27.github.io/CentralKV-/)
- **Paper PDF:** [static/pdfs/CentralKV.pdf](static/pdfs/CentralKV.pdf)
- **Code repository:** [https://github.com/Sanmu-27/CentralKV](https://github.com/Sanmu-27/CentralKV)

## Citation

~~~bibtex
@inproceedings{wu2026centralkv,
  title     = {CentralKV: Compressing Long-Context LLMs via Attention-Graph Centrality},
  author    = {Wu, Yusen and Yinjun, Huang and Tan, Jia Yee and Li, Hao and Guo, Rongfeng and Fan, Liang and Luo, Jiachen and Dong, Guangyuan and Xiang, Sike},
  booktitle = {Proceedings of EMNLP 2026},
  year      = {2026},
  url       = {https://github.com/Sanmu-27/CentralKV}
}
~~~

## Authors

Yusen Wu, Huang Yinjun, Jia Yee Tan, Hao Li, Rongfeng Guo, Liang Fan, Jiachen Luo, Guangyuan Dong, and Sike Xiang (corresponding author).

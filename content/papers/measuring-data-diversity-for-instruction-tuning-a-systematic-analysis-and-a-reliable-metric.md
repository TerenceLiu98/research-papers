---
title: "Measuring Data Diversity for Instruction Tuning: A Systematic Analysis and A Reliable Metric"
type: paper
authors:
  - Yuming Yang
  - Yang Nan
  - Junjie Ye
  - Shihan Dou
  - Xiao Wang
  - Shuo Li
  - Huijie Lv
  - Tao Gui
  - Qi Zhang
  - Xuanjing Huang
year: null
tags:
  - instruction-tuning
  - data-diversity
  - data-selection
  - large-language-models
---

## TL;DR

The paper evaluates 11 existing diversity metrics against instruction-tuned model performance and argues that useful diversity measurements must capture both local sample uniqueness and uneven information density. Its proposed NovelSum metric combines a proximity-weighted sum of inter-sample distances with a density-aware distance. Across the reported LLaMA-3-8B and Qwen-2.5-7B experiments, NovelSum has the strongest average correlation with model performance; a greedy selector derived from it, NovelSelect, also produces the best reported instruction-tuning results among the compared selection strategies.

## Research Question

Which properties make a dataset-diversity metric reliably track downstream instruction-tuning performance, and can such a metric directly guide the selection of instruction data?

## Motivation

Instruction-tuning data selection often treats diversity as desirable, but lexical, distance-based, and distribution-based metrics operationalize it differently. A metric can favor the strategy it resembles while failing to rank datasets by downstream model performance. The paper therefore treats correlation with instruction-tuning performance as an empirical test of whether a diversity measure captures task-relevant variation.

## Contributions

- A comparison of 11 lexical, distance-based, and distribution-based diversity metrics over 53 fixed-size instruction-tuning datasets for LLaMA-3-8B, with a second 25-dataset analysis for Qwen-2.5-7B.
- An empirical diagnosis of two missing ingredients: nearby samples should matter more when measuring uniqueness, and semantic distance should be adjusted for local information density.
- NovelSum, which represents dataset diversity as the sum of sample-level novelty scores based on proximity-weighted, density-aware distances.
- NovelSelect, a greedy data-selection procedure that uses sample novelty as its selection objective.

## Method

### Evaluating diversity metrics

The study constructs 10,000-example subsets from WizardLM, ShareGPT, and UltraChat using K-Center-Greedy, Repr Filter, QDIT, k-means, farthest-point, random, and controlled-duplication strategies. It compares 11 metrics, including type-token ratio, vocd-D, pairwise distance sums, KNN distance, cluster inertia, Vendi Score, radius, log-determinant distance, facility location, and partition entropy. Fine-tuned model performance combines standardized MT-bench and AlpacaEval results, and metric reliability is summarized by the mean of Pearson and Spearman correlations.

The analysis finds that lexical metrics barely distinguish the instruction datasets; distributional coverage can overlook sample uniqueness; distance-only metrics overlook variation in information density; and pairwise or nearest-neighbor distances handle duplicate-heavy datasets poorly in different ways. These findings motivate the paper's formulation of [[Instruction-Tuning Data Diversity]].

### NovelSum

For a selected dataset \(\mathcal{X}\), NovelSum adds a novelty score for every sample:

$$
\mathcal{M}_{\mathrm{NovelSum}}(\mathcal{X}) = \sum_{x_i \in \mathcal{X}} v(x_i).
$$

Each \(v(x_i)\) is a weighted sum of distances to other selected samples. The weight decreases with the neighbor's distance rank, so nearby comparisons contribute more strongly than distant ones. The distance itself multiplies semantic distance by a local-density factor estimated from nearest neighbors in the full data pool. Main experiments use cosine distance, proximity exponent \(\alpha=1\), density exponent \(\beta=0.5\), and 10 nearest neighbors.

### NovelSelect

NovelSelect greedily adds the candidate with the largest novelty relative to the current selected set until reaching the data budget. This is an approximation to directly maximizing NovelSum, rather than an exact solution to the combinatorial subset-selection objective.

## Experiments

On LLaMA-3-8B, NovelSum reaches Pearson correlation 0.98 and Spearman correlation 0.95 with the aggregate performance measure, for an average of 0.97. The next-highest reported average is 0.86 for partition entropy. On Qwen-2.5-7B, NovelSum's reported average correlation is 0.90, compared with 0.76 for cluster inertia, the strongest listed baseline in that experiment.

The ablation study supports both core components. Removing proximity weighting lowers the LLaMA average correlation from 0.97 to 0.55; removing the density term lowers it to 0.91. Replacing cosine with Euclidean distance produces 0.90, while increasing the nearest-neighbor count from 10 to 20 leaves the displayed average at 0.97. Additional sweeps indicate degradation at extreme values of the proximity and density exponents rather than uniform insensitivity.

In the LLaMA-3-8B selection experiment, NovelSelect obtains MT-bench 6.47, AlpacaEval 78.07, and aggregate performance 1.55. The strongest compared aggregate baseline is k-means at 1.32, followed by K-Center-Greedy at 1.31. Results are averaged over three runs.

## Limitations

- The correlation evidence covers two 7B-8B model families and primarily general instruction tuning; it does not establish the same rankings for larger models or specialized domains such as mathematics and code.
- The performance target combines MT-bench and AlpacaEval, so unmeasured capabilities and real-world use cases may imply a different notion of useful diversity.
- NovelSum depends on the embedding model and reference pool used to estimate semantic geometry and density. The paper reports the strongest correlations when the embedding extractor matches the fine-tuning backbone.
- Correlation with performance is evaluated on datasets produced by a finite set of selection strategies. It supports predictive validity in those experiments but does not prove a universal causal effect of diversity.
- NovelSelect is evaluated only with LLaMA-3-8B in the reported data-selection experiment, and the source reports no direct comparison of end-to-end selection cost in the result table.

## Related Concepts

- [[Instruction-Tuning Data Diversity]]
- [[Text Embedding Models]]

## Related Papers

- Bukharin et al. (2024), *Data Diversity Matters for Robust Instruction Tuning*, supplies one of the instruction-tuning diversity baselines evaluated by the paper.
- Liu et al. (2023), *What Makes Good Data for Alignment? A Comprehensive Study of Automatic Data Selection in Instruction Tuning*, motivates the combined source pool and the Repr Filter comparison.
- Diddee and Ippolito (2024), *Chasing Random: Instruction Selection Strategies Fail to Generalize*, motivates testing whether diversity-oriented selection reliably improves over random selection.

Source note: Synthesized from the supplied parsed Markdown for Cognitio job `3ac55dc8-7c6c-4485-aa84-e2d36fadcad7`. The text does not explicitly identify this paper's publication year, venue, DOI, or arXiv identifier; these are left unspecified.

[[index|Library home]]

---
title: "TabICLv2: A better, faster, scalable, and open tabular foundation model"
type: paper
authors:
  - Jingang Qu
  - David Holzmuller
  - Gael Varoquaux
  - Marine Le Morvan
year: null
source_job_id: "f9887c2d-0f7f-4be4-bf21-a96ace7faeec"
tags:
  - tabular-foundation-models
  - in-context-learning
  - synthetic-data
  - long-context-attention
  - quantile-regression
---

## TL;DR

TabICLv2 advances [[concepts/tabular-foundation-models|Tabular Foundation Models]] with a more diverse synthetic pretraining prior, early target-aware feature embeddings, and query-aware scalable softmax (QASSMax) for length generalization. Without dataset-specific tuning, it reports state-of-the-art aggregate results on TabArena and TALENT, handles classification and regression, and uses CPU or disk offloading to run million-row tables under 50 GB of GPU memory. Its remaining gaps include semantic feature use, native missing-data modeling, multi-output regression, and predictive evaluation of distributional regression beyond synthetic tasks.

## Research Question

Can an open-weight tabular foundation model improve predictive quality and generalize from moderate pretraining contexts to much larger tables without relying on retrieval, distillation, real-data fine-tuning, or a larger backbone?

## Motivation

Prior-data fitted networks perform [[concepts/in-context-learning|In-Context Learning]] by treating a labeled table as context, but their usefulness depends on both the synthetic task distribution learned during pretraining and attention behavior at inference scale. Standard softmax attention becomes less selective as the number of context rows grows, while cell-based architectures can be prohibitively expensive. TabICLv2 targets these coupled problems through a richer synthetic prior, a compressed column-then-row architecture, and length-aware attention scaling.

## Contributions

- Extends TabICL's column-then-row architecture with repeated feature grouping and target-aware embeddings that inject labels before column and row compression.
- Introduces QASSMax, which combines a learned function of log context length with bounded, element-wise query-dependent gating to counter attention fading.
- Supports more than ten classes through mixed-radix label views before column encoding, combined with hierarchical classification at the dataset-level ICL stage.
- Models regression with 999 conditional quantiles and pinball loss rather than fixed target bins.
- Develops a high-diversity synthetic prior based on random causal graphs, eight families of random functions, correlated hyperparameter sampling, and filtering of uninformative tasks.
- Replaces AdamW with Muon and uses a three-stage curriculum that reaches synthetic datasets of 60,000 samples.
- Adds selective query/key/value projection and CPU or disk activation offloading for large-table inference.

## Method

### Compression Then In-Context Learning

For a table with $n$ rows and $m$ columns, TabICLv2 retains TabICL's $O(n^2 + nm^2)$ organization. Each feature participates in three circularly shifted groups, using offsets $(0,1,3)$, so related columns can interact without reducing the number of effective features. Training labels are embedded and added to every grouped feature token before a Set Transformer performs column-wise encoding. A row transformer then compresses the feature tokens through four learned `[CLS]` tokens, producing one fixed-dimensional representation per row. Finally, a dataset-wise transformer lets test rows attend to labeled training rows and predicts their targets.

This early target injection differs from [[papers/tabicl-a-tabular-foundation-model-for-in-context-learning-on-large-data|TabICL]], where labels enter only after row compression. The paper's ablations attribute a substantial improvement to this change, while repeated feature grouping provides a smaller gain.

### Query-Aware Scalable Softmax

Standard attention can flatten when the context grows beyond lengths seen during training because the softmax denominator grows with the number of keys. QASSMax rescales every query dimension using two factors: a learned base scale derived from $\log n$ and a bounded gate derived from the query itself. It is used where inducing points aggregate column values and throughout dataset-wise ICL.

In the paper's synthetic needle-in-a-haystack classification test, ordinary softmax loses accuracy as negative examples increase, whereas QASSMax retains 100% accuracy through 15,000 negatives and keeps normalized attention entropy low. This controlled result isolates attention fading, while the benchmark ablation shows that QASSMax also improves real-table performance.

### Classification and Regression Heads

Classification pretraining uses at most ten classes. For larger label spaces, mixed-radix ensembling decomposes each label into several digits whose bases are at most ten, runs column encoding for each view, and averages the resulting representations. Hierarchical classification then resolves the original classes during dataset-wise ICL. The native method is reported to be about three times faster than an error-correcting-output-code wrapper, although the wrapper is slightly more accurate on the evaluated many-class datasets.

The regression checkpoint outputs 999 quantiles trained with pinball loss. The associated distribution object corrects quantile crossing and extrapolates exponential tails, permitting quantiles, densities, moments, and continuous ranked probability scores to be derived from one prediction.

### Synthetic Prior and Pretraining

Synthetic tables are sampled from directed acyclic graphs whose nodes apply random neural networks, symmetric tree ensembles, discretizers, Gaussian processes, linear or quadratic maps, plateau-forming functions, or products. Numerical and categorical columns are extracted from node dimensions, with some latent dimensions left unobserved. Filters reject graphs where inputs and targets have no common ancestor and datasets where ExtraTrees cannot beat a constant predictor under a bootstrap test.

Pretraining uses 500,000 steps at 1,024 samples, 40,000 steps over 400-10,240 samples, and 10,000 steps over 400-60,000 samples, all with batch size 64. The stated cost is 24.5 H100 GPU-days for each classification or regression model. Muon, cautious weight decay, mixed precision, gradient checkpointing, and FlashAttention-3 are used in this process.

## Experiments

The main evaluations use TabArena's 51 datasets and TALENT's 300 datasets. TabArena measures repeated cross-validation performance using ROC AUC, log loss, or RMSE and uses eight estimators. TALENT covers 120 binary-classification, 80 multiclass, and 100 regression datasets with fixed train/validation/test splits and uses 32 estimators. The authors exclude their development datasets from the main TALENT comparison.

- Without hyperparameter tuning, TabICLv2 leads the reported aggregate TabArena and TALENT comparisons and surpasses tuned-and-ensembled RealTabPFN-2.5 on the overall evaluations.
- On TALENT, its average rank is 4.66, compared with 5.11 for RealTabPFN-2.5 and 5.45 for TabPFN-2.5; its pairwise win rates against them are 62% and 65%, respectively.
- On TabArena regression, TabICLv2 and RealTabPFN-2.5 tie at an average rank of 4.54. On multiclass TabArena datasets, TabICLv2 ranks 6.75 and trails RealTabPFN-2.5's 4.25, though the latter uses tuning and ensembling.
- For TALENT binary classification, accuracy ranks are similar, but TabICLv2 reports better AUC and log-loss ranks. It leads RealTabPFN-2.5 across accuracy, AUC, and log loss on multiclass tasks with at most ten classes.
- At 50,000 rows and 100 features on an H100, the reported speedup over TabPFN-2.5 is 10.6 times; on CPU it reaches 11.8 times at 10,000 rows.
- Disk offloading processes a table with one million samples and 500 features in about 450 seconds with less than 24 GB of CPU memory and less than 50 GB of GPU memory. This is a resource demonstration rather than a predictive benchmark at that scale.
- The ablation identifies the new synthetic prior as the largest contributor. Early target injection, Muon, and QASSMax each produce similar substantial gains; repeated grouping and prior filtering contribute smaller improvements. A deeper model and added causal-graph noise do not yield clear benefits.

## Limitations

- Column names and textual feature semantics are not used.
- Million-row inference remains resource-intensive, and disk offloading is roughly four times slower than CPU offloading in the reported configuration.
- Distributional regression is validated only on synthetic tasks with known distributions; the real-data benchmarks evaluate point metrics rather than distribution quality.
- Missing values are mean-imputed. Missingness indicators and missingness-aware pretraining are not evaluated.
- Multi-output regression and explicit distribution-shift handling are left for future work.
- The strongest aggregate comparisons mix different adaptation budgets: TabICLv2 is untuned but ensembled, while RealTabPFN-2.5 is tuned, ensembled, and continued-pretrained on real data.
- The authors report that TabICLv2 trained with the older TabICL prior degrades, while the TabICL architecture cannot fully exploit the new prior. This architecture-prior interaction limits conclusions about either component in isolation.
- At the time described by the paper, inference code and model weights are released, while the synthetic generator and pretraining code are promised for a later release; the complete reproducibility package is therefore not yet available.

## Related Concepts

- [[concepts/tabular-foundation-models|Tabular Foundation Models]]
- [[concepts/in-context-learning|In-Context Learning]]
- [[concepts/variable-column-tabular-learning|Variable-Column Tabular Learning]]
- Set Transformers
- Quantile regression
- Synthetic data generation
- Long-context attention

## Related Papers

- [[papers/tabicl-a-tabular-foundation-model-for-in-context-learning-on-large-data|TabICL: A Tabular Foundation Model for In-Context Learning on Large Data]]: supplies the compression-first architecture and staged large-table pretraining that TabICLv2 extends.
- Hollmann et al. (2025), "Accurate Predictions on Small Data with a Tabular Foundation Model": presents TabPFNv2, the central architectural and empirical comparator.
- Grinsztajn et al. (2025), "TabPFN-2.5: Advancing the State of the Art in Tabular Foundation Models": provides the deeper foundation model underlying the RealTabPFN-2.5 comparison.
- Nakanishi (2025), "Scalable-Softmax Is Superior for Attention": introduces length-scaled softmax, which QASSMax makes query-aware and element-wise.
- Erickson et al. (2025), "TabArena: A Living Benchmark for Machine Learning on Tabular Data": supplies one of the two principal evaluations.
- Ye et al. (2024), "A Closer Look at Deep Learning Methods on Tabular Datasets": introduces the TALENT benchmark.

[[index|Library home]]

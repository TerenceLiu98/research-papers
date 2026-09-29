---
title: Not All Language Model Features Are One-Dimensionally Linear
type: paper
authors:
  - Joshua Engels
  - Eric J. Michaud
  - Isaac Liao
  - Wes Gurnee
  - Max Tegmark
year: null
source_job_id: "50cdf933-c605-475a-a405-791a9add34d2"
tags:
  - mechanistic-interpretability
  - sparse-autoencoders
  - representation-geometry
---

## TL;DR

Some language-model features are better understood as multidimensional objects than as isolated scalar directions. The authors define statistical irreducibility, cluster sparse-autoencoder dictionary elements to discover circular calendar representations, and intervene on circular subspaces in Mistral 7B and Llama 3 8B. These interventions support a causal role in the tested calendar-arithmetic tasks, while leaving the prevalence of such features and the exact arithmetic algorithm unresolved.

## Research Question

Can language models represent and compute with features that cannot be decomposed into statistically independent or non-co-occurring lower-dimensional features, and can these features be discovered using existing sparse autoencoders?

## Motivation

Treating every feature as a one-dimensional direction can fragment a representation whose coordinates jointly encode one concept. Circular representations previously studied in toy arithmetic models motivate looking for similar structures in pretrained language models. The paper challenges universal one-dimensionality, while retaining the possibility that hidden states are additive combinations of feature representations.

## Contributions

- Defines [[concepts/irreducible-multidimensional-features|irreducible multidimensional features]] and relaxed separability and mixture indices for detecting candidates.
- Proposes a multidimensional superposition hypothesis, with low-dimensional features embedded in approximately orthogonal subspaces; Appendix A gives capacity bounds with a substantial gap between upper and lower bounds.
- Introduces an SAE-clustering discovery procedure and finds circular weekday, month, and twentieth-century year representations in GPT-2, and weekday and month representations in Mistral 7B.
- Tests circular-subspace interventions, transfer of an SAE-derived probe across nearby layers, and contextual shifts along the weekday circle.
- Uses [[concepts/explanation-via-regression|Explanation via Regression]] in Appendix K to reveal an output circle obscured by input-related variance.

## Method

**Statistical definition.** A feature maps the subset of inputs on which it is active into a vector space. It is reducible if a rotation and translation makes its distribution either factor into independent coordinate blocks or split into disjoint components with a lower-dimensional component. The relaxed separability index minimizes mutual information between coordinate blocks; low values indicate separability. The epsilon-mixture index maximizes the probability mass near an affine hyperplane, relative to projected RMS scale; high values indicate mixture-like structure (Section 3).

**Discovery.** Cluster decoder directions from [[concepts/sparse-autoencoders|Sparse Autoencoders]] by cosine similarity. Reconstruct activations using only each cluster's dictionary elements, discard inputs where none activate, and inspect PCA projections or score their irreducibility. GPT-2-small layer 7 uses spectral clustering into 1,000 clusters. Mistral layer 8 uses connected components of a graph linking each direction to its two nearest neighbors, with edges below cosine similarity 0.5 removed (Appendix F). Its SAEs have 65,536 dictionary elements and were trained on over one billion tokens from Pile and Alpaca subsets at layers 8, 16, and 24 (Appendix E).

**Intervention.** For a starting weekday or month, fit a linear probe from the top five activation PCs to its sine/cosine coordinates on a unit circle. Replace the circular component with a target label's coordinates while mean-ablating the remaining activation components. Compare with patching five PCs, the full activation at that layer and token, and the task mean. This use of [[concepts/linear-probing|Linear Probing]] locates a subspace; the intervention supplies the causal evidence. Separate experiments use the plane discovered through SAE clustering and sweep off-distribution radii and angles (Section 5).

## Experiments

Weekdays comprises 49 prompts spanning seven starting days and offsets of one through seven days. Months comprises 144 prompts spanning twelve starting months and offsets of one through twelve months. Accuracy is computed by choosing the highest-logit valid answer token, rather than unrestricted generation (Table 1).

| Model | Weekdays correct | Months correct |
| --- | --- | --- |
| Llama 3 8B | 29 / 49 | 143 / 144 |
| Mistral 7B | 31 / 49 | 125 / 144 |
| GPT-2 | 8 / 49 | 10 / 144 |

GPT-2 has circular representations despite poor task performance. Mistral and Llama also perform poorly on equivalent prompts written as plain modular arithmetic, so calendar performance does not establish general modular-addition competence (Section 5).

The GPT-2 weekday, month, and year clusters rank 9th, 28th, and 15th among 1,000 clusters by the product of separability and one minus the mixture index. Scoring averages tests over selected two-dimensional PCA planes, rather than evaluating full-dimensional irreducibility exactly. The clearest circles often occupy PCs 2 and 3; an additional intensity direction makes the overall geometry closer to a cone (Section 4).

Circular interventions in early layers approach full-activation patching effects and usually exceed five-PC patching effects, especially on Weekdays. There are 294 weekday and 1,584 month intervention comparisons per model and layer; Figure 6 reports 96% normal-approximation confidence intervals across prompt comparisons. Intervention effects on the starting-token representation decline around layers 15-17 as information is copied to the final token (Sections 5.1 and H.3).

For Mistral Weekdays at layer 8, the SAE-plane probe produces an average logit difference of -2.01 versus -2.58 for the ordinary circular probe. With both layer-8 probes applied at layer 6, the respective values are -2.32 and 0.029. Under the reported original-minus-target answer convention, more negative values favor the intervention target. These results suggest greater nearby-layer robustness for the SAE-derived plane in this experiment (Section 5.2).

Off-distribution interventions indicate that angle carries the weekday value. Temporal qualifiers such as very early and very late shift Mistral's weekday activations toward adjacent weekdays, supporting graded temporal organization (Section 5.3). Appendix K removes variance explained by one-hot starting-day and offset predictors and finds a clear output-day circle in layer-25 residuals. This is consistent with trigonometric computation but does not identify a complete clock or pizza algorithm.

## Limitations

- Only a few discovered structures have clear interpretations. The search cannot distinguish rarity from limitations of clustering, visualization, or restricting tests to two-dimensional projections.
- Statistical irreducibility is not the same as computational necessity. The relaxed indices are approximate, distribution-dependent diagnostics, and the superposition account remains a hypothesis.
- Circular interventions combine subspace replacement with mean ablation elsewhere. Their effects support causal involvement under this intervention protocol, without proving an exclusive mechanism in unmodified runs.
- Evidence comes from small, fixed calendar prompt sets and selected models and layers. Discovery involved substantial manual inspection: roughly 500 GPT-2 clusters and 2,000 Mistral clusters (Appendices F and H).
- The supplied Markdown contains malformed equations and inconsistent symbols in the intervention description. This summary follows its prose and does not reproduce those equations. Publication year and a stable identifier for this paper are absent, so the year is unset.

## Related Concepts

- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/explanation-via-regression|Explanation via Regression]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/linear-probing|Linear Probing]]

## Related Papers

References discussed in the supplied paper:

- Park, Choe, and Veitch (2023), "The Linear Representation Hypothesis and the Geometry of Large Language Models": the representation hypothesis under examination.
- Nanda et al. (2023), "Progress Measures for Grokking via Mechanistic Interpretability": circular computation in toy modular arithmetic.
- Zhong et al. (2024), "The Clock and the Pizza: Two Stories in Mechanistic Explanation of Neural Networks": alternative arithmetic mechanisms.
- Zhang and Nanda (2023), "Towards Best Practices of Activation Patching in Language Models: Metrics and Methods": intervention methodology.

Related library reading, without implying citation by this paper:

- [[papers/projecting-assumptions-the-duality-between-sparse-autoencoders-and-concept-geometry|Projecting Assumptions: The Duality Between Sparse Autoencoders and Concept Geometry]] examines how encoder geometry constrains concept recovery, complementing this paper's grouping of dictionary directions into multidimensional features.

[[index|Library home]]

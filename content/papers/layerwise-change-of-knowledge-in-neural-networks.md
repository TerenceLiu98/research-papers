---
title: Layerwise Change of Knowledge in Neural Networks
type: paper
authors:
  - Xu Cheng
  - Lei Cheng
  - Zhaoran Peng
  - Yang Xu
  - Tian Han
  - Quanshi Zhang
year: null
tags:
  - neural-network-interpretability
  - interaction-primitives
  - linear-probing
  - representation-learning
---

## TL;DR

The paper extracts [[concepts/and-or-interaction-primitives|AND/OR interaction primitives]] from classifiers trained on intermediate representations, making layers comparable through shared input-variable subsets. Across the studied networks, early and middle layers often acquire final-output interactions along with redundant interactions that later layers remove. Lower-order interactions generally transfer better across models and remain more stable under small Gaussian perturbations. These are operational measures of probe-accessible inference patterns, with architecture-specific exceptions.

## Research Question

How can the emergence, retention, and disappearance of task-relevant interaction effects be quantified across layers during forward propagation, and how do these patterns relate to agreement across models and sensitivity to input noise?

## Motivation

Hidden feature dimensions need not align across layers. Aggregate information measures also do not identify which particular patterns emerge or disappear. The authors instead align explanations through fixed subsets of input variables, allowing comparisons even when hidden representations have different dimensions.

## Contributions

- Extends scalar-output interaction analysis to intermediate representations through [[concepts/linear-probing|Linear Probing]].
- Defines order-specific overlap, forgotten strength, newly emerged strength, completeness, and redundancy relative to the final layer.
- Reports sparse salient interactions, characteristic layerwise trajectories, greater cross-model overlap for lower-order interactions, and greater relative stability of those interactions under noise.

## Method

For an input with variable indices $N$, let $x_T$ retain variables in $T$ and replace the others with baseline values. An AND-only decomposition uses

$$
I_{\mathrm{and}}(S\mid x)=\sum_{T\subseteq S}(-1)^{|S|-|T|}v(x_T).
$$

For the joint AND/OR explanation, the score is split into $v_{\mathrm{and}}(x_T)=v(x_T)/2+\gamma_T$ and $v_{\mathrm{or}}(x_T)=v(x_T)/2-\gamma_T$. AND effects are computed from the first component; OR effects use the negative alternating sum of the second component evaluated at complementary masks. The decomposition parameters are optimized for sparsity. An AND term activates when all its variables are retained; an OR term activates when at least one is retained. Interaction order is $|S|$.

At layer $l$, a linear classifier is trained with cross-entropy on the original classification task using that layer's features. Its true-label log-odds, minus a bounded learned residual $\delta_T$, becomes the scalar score $v^{(l)}(x_T)$. The residual and decomposition parameters minimize the summed absolute AND/OR effects. The default residual bound is 0.04 times the absolute score difference between the fully present and fully masked input (Section 3.2.2).

For each order and interaction type, salient effects from layer $l$ are compared with those from final layer $L$. A shared effect is zero for opposite signs and otherwise takes the common sign and smaller absolute magnitude. Summing shared magnitudes gives overlap; the remaining magnitudes give forgotten strength at $l$ and newly emerged strength at $L$:

$$
\mathrm{all}^{(l)}=\mathrm{overlap}+\mathrm{forget},\qquad
\mathrm{all}^{(L)}=\mathrm{overlap}+\mathrm{new}.
$$

Completeness is overlap divided by final-layer strength; redundancy is forgotten strength divided by current-layer strength. These quantify effect magnitudes, rather than simply counting patterns. The reported trajectories compare each layer with the final layer; they are not a direct measurement of every adjacent-layer transition.

Cross-model agreement is the intersection-over-union of salient subset sets at a fixed order. Relative stability averages the absolute mean interaction effect divided by its standard deviation under input perturbations. Theorem 3.3 gives exact reconstruction with the full decomposition; retaining only salient interactions gives an approximation whose usefulness depends on sparsity. Section 3.2.1 explicitly notes that sparsity for the jointly optimized AND/OR explanation is not generally proven.

## Experiments

The image models are MLP-7, VGG-11, and ResNet-20 on MNIST and CIFAR-10, with ResNet-32 additionally used for cross-model comparisons. Language experiments use DistilBERT and BERT_BASE on SST-2, adding XLNet for cross-model comparisons. Appendix I also examines MLP-7 on UCI census and commercial tabular data.

To control exponential subset enumeration, the analysis uses 100 MNIST images with 10 selected foreground patches each, 30 CIFAR-10 images with 12 selected central patches each, and 50 SST-2 sentences of 10 words each (Appendix M.1). The salience threshold is 5% of the largest absolute AND/OR effect across evaluated samples and subsets for the target layer and model. First-order OR effects are merged into first-order AND effects for reporting (Appendix M.4).

- **Sparsity:** Section 3.2.1 reports about 21.8 salient AND/OR interactions per MNIST image and 45.6 per CIFAR-10 image.
- **Layerwise trajectories:** Figures 3 and 7 show that lower-order interactions tend to have greater strength. Completeness often rises early, while redundancy often rises and then falls. Very high-order interactions emerge later and are less stable.
- **Exceptions:** Appendix K reports that MLP-7 and VGG-11 on CIFAR-10 acquire target interactions in middle and higher layers with little redundancy and limited change at the top. The tabular models also learn target interactions quickly without much redundancy. ResNet-20 and the SST-2 models more clearly exhibit late removal of redundant high-order interactions.
- **Cross-model agreement:** Figures 4 and 8 report higher subset IoU for lower-order interactions in the image and language comparisons. These tests use selected intermediate layers near the output, not every possible layer pairing.
- **Noise sensitivity:** With Gaussian perturbations of standard deviation 0.02, relative stability declines with interaction order in the image experiments (Figures 5 and 9). Appendix L checks that input noise-to-signal ratios do not systematically increase with order in its CIFAR-10 analysis.
- **Residual-bound ablation:** On CIFAR-10 ResNet-20, coefficients of 0.03, 0.04, and 0.05 yield similar extracted effects (Appendix J). This is a limited sensitivity check, not evidence of invariance to all extraction choices.

## Limitations

Linear probes measure information accessible to the chosen classifier on the training task. They may miss information present in a representation or expose patterns the original downstream network does not use. Appendix D acknowledges probe structure, probe/model mismatch, and incomplete training data as limitations.

Masking baselines can introduce prediction bias (Appendix E). Explanations also depend on variable grouping, salience thresholds, sparse decomposition, and residual correction. Exact enumeration requires $2^n$ masks, motivating the small samples and restricted input subsets used here.

Cross-model subset overlap is the paper's operational definition of generalizability; it does not establish a conventional test-error bound or out-of-distribution performance. Gaussian stability covers a particular perturbation model. Neither exact score reconstruction nor sparsity establishes alignment with human knowledge. The forward-propagation analysis also does not track forgetting over training time.

The supplied Markdown omits the publication year, venue, and stable identifier; the year is left unknown. Several appendix equations and captions contain extraction artifacts, so the summary relies on interpretable definitions and accompanying prose without reproducing damaged expressions or inferring unreported figure values.

## Related Concepts

- [[concepts/and-or-interaction-primitives|AND/OR Interaction Primitives]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]: a contrasting approach that explicitly mediates predictions through semantic concepts; this paper decomposes the scores of existing networks and probes.

## Related Papers

- Li and Zhang (2023), "Does a Neural Network Really Encode Symbolic Concepts?" Provides the interaction-based framing used here.
- Ren et al. (2024), "Where We Have Arrived in Proving the Emergence of Sparse Interaction Primitives in AI Models." Supplies conditional sparsity theory discussed by the authors.
- Liang et al. (2020), "Knowledge Consistency between Neural Networks and Beyond." A feature-reconstruction approach contrasted with subset-based alignment.
- Zhou et al. (2024), "Explaining Generalization Power of a DNN Using Interactive Concepts." Connects interaction complexity with cross-model generalization.

[[index|Library home]]

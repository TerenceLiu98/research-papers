---
title: Activation Transport Operators
type: paper
authors:
  - Andrzej Szablewski
  - Marek Masiak
year: null
source_job_id: "a7529790-e954-4d3a-8f35-28d95ce81da1"
tags:
  - mechanistic-interpretability
  - residual-stream
  - sparse-autoencoders
  - linear-transport
---

## TL;DR

Activation Transport Operators (ATOs) fit affine maps between transformer residual states and evaluate their predictions along downstream SAE decoder directions. On Gemma 2 2B, short layer leaps preserve many selected features, while longer leaps generally reduce predictability. Replacing residuals with ATO reconstructions preserves substantially more language-model performance than zeroing them. A canonical-correlation analysis quantifies the available linear prediction channels.

## Research Question

How much downstream feature information can be predicted linearly from an earlier residual state, and how does this depend on layer distance, depth, and operator rank?

## Motivation

Feature dictionaries identify directions and activation patching identifies influential sites, but neither directly supplies a fitted map predicting downstream residual states. Such a map can characterize [[concepts/linear-residual-stream-transport|Linear Residual-Stream Transport]] and support diagnostics of where linear prediction succeeds or fails.

## Contributions

- Defines regularized, rank-constrained affine operators learned from paired forward-pass activations.
- Evaluates feature-direction prediction and residual-replacement perplexity using pretrained [[concepts/sparse-autoencoders|Sparse Autoencoders]].
- Derives a rank-dependent ceiling in whitened output space and defines transport efficiency relative to it.
- Estimates the effective dimensionality of linear prediction channels from squared canonical correlations.

## Method

For the same token position at layers separated by $k$, an ATO predicts

$$
\hat v_{l+k,i}=T_r v_{l,i}+b,\qquad T_r=U_r S_r V_r^\top.
$$

The experiments use ridge regression selected by five-fold cross-validation. Evaluation compares $d_f^\top\hat v$ with $d_f^\top v$ using downstream SAE decoder directions $d_f$, reporting $R^2$ and MSE. These decoder projections are distinct from SAE encoder activations; activated latents select the evaluation cases.

For centered upstream and downstream matrices, whitening yields a cross-covariance whose singular values are canonical correlations $\rho_i$. Appendix A gives the optimal rank-$r$ linear explained-variance ceiling in whitened downstream space:

$$
R^2_{\mathrm{ceiling}}(r)=\frac{1}{d}\sum_{i=1}^r\rho_i^2,
\qquad
\mathrm{Eff}=\frac{\widetilde R^2_{\mathrm{ATO}}}{R^2_{\mathrm{ceiling}}(r)}.
$$

The numerator must use the same whitened output metric. The effective dimension is the participation ratio

$$
d_{\mathrm{eff}}=\frac{(\sum_i\rho_i^2)^2}{\sum_i\rho_i^4}.
$$

This describes spectral concentration, not an exact rank cutoff. The intervention evaluation compares unedited, ATO-replaced, and zeroed downstream residuals through perplexity; feature-targeted behavioral editing remains future work.

## Experiments

Appendix B uses Gemma 2 2B (hidden width 2,304), Gemma Scope post-layer SAEs with 16,384 latents, and 250,000 uniformly subsampled SlimPajama tokens split 60/20/20 into training, validation, and test sets. Feature selection processes 120,000 tokens, retaining approximately 5% of features per layer using coherence, unembedding, causal-effect, and redundancy heuristics. Evaluation retains activated features with at least ten test activations and $R^2>-1$.

| Evaluation | Reported result |
| --- | --- |
| Feature prediction | Short leaps, including $k=1$ and $k=4$ into layer 10, transport many selected features with $R^2>0.95$. Performance generally weakens with distance and target depth. |
| Nonmonotonic behavior | For target layer 21, average feature $R^2$ reaches a minimum at $k=10$ and improves for longer leaps; the explanation is left open. |
| Effective dimension, target layer 10 | $d_{\mathrm{eff}}=2198$ for $k=1$, 1453 for $k=7$, and 1291 for $k=10$. Longer leaps show earlier, lower efficiency plateaus. |
| Five-position replacement | At $k=10$, the perplexity increase is 7.1% of the degradation under zero intervention; for $k<5$, it is below 1.2%. These are normalized degradation figures, not absolute perplexity increases. |
| All-position replacement | The text reports at most a 13.5% increase at $k=10$ and an upper-bound perplexity of 12.4529, but does not clearly specify that percentage's denominator. |

Perplexity evaluation uses 100 held-out sequences of 256 tokens, replacing one, five, or all positions; random-position settings are averaged over three position sets. Experiments run in float32 on M1 Pro and M2 Max hardware (Appendix B).

## Limitations

Only one model and the same-token pairing policy are evaluated, leaving cross-token attention routing and architectural generalization unresolved. High linear predictability cannot distinguish preserved features from newly formed linear combinations. Low predictability alone does not establish nonlinear synthesis. Feature selection and removal of cases with $R^2\leq-1$ limit conclusions about the full feature population; target layers also use different feature sets. The proposed early-layer storage versus later-layer recomputation explanation is an interpretation of the observed trends. Effective dimension is not a proof that every additional rank above it has zero predictive value. Feature-specific corrections and safety applications are proposed rather than demonstrated.

The supplied Markdown does not state a publication year or a stable paper identifier; neither is inferred from reference dates.

## Related Concepts

- [[concepts/linear-residual-stream-transport|Linear Residual-Stream Transport]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
- [[concepts/transformer-green-operators|Transformer Green Operators]]: local intervention Jacobians provide a complementary propagation description to regression across observed states.

## Related Papers

- [[papers/transformer-field-theory-a-response-theoretic-approach-to-mechanistic-interpretability|Transformer Field Theory: A Response-Theoretic Approach to Mechanistic Interpretability]] studies trajectory-specific perturbation propagation, whereas ATOs fit state prediction across activation samples. This is a library comparison, not a citation made by the source paper.
- Lawson et al., *Residual Stream Analysis with Multi-Layer SAEs*, cited by the source as related evidence on transport versus recomputation.
- Belrose et al., *Eliciting Latent Predictions from Transformers with the Tuned Lens*, cited for affine intermediate-to-vocabulary readouts.

[Author-provided code](https://github.com/marek357/activation-transport-operators).

[[index|Library home]]

---
title: "Collective contributions to polarized voting"
type: paper
authors:
  - Edward D. Lee
year: 2026
date: "2026-09-09"
source_job_id: 046ebe51-c5cf-4f7c-a1b4-396058cd5aa2
tags:
  - political-polarization
  - roll-call-voting
  - latent-variable-models
  - statistical-physics
---

## TL;DR

A generalized restricted Boltzmann machine models U.S. Senate roll calls using multidimensional voter preferences and a shared latent voting context. Three dimensions, including a common consensus field, closely reproduce vote margins and pairwise statistics, and capture about 90% of the multi-information among 11 median voters from the 105th Congress onward. Both individual conditional entropy and context entropy decline over time. The author interprets the latter as evidence that fewer contexts elicit bipartisan coalitions, but the fitted model does not identify the causal effects of agenda setting or voting rules.

## Research Question

Can a compact statistical model capture partisan division and bipartisan consensus together, distinguish individual preferences from shared voting context, and connect preference-based accounts of voting to interaction models?

## Motivation

Party-line voting leaves out substantial variation in legislative coalitions. In the paper's examples, strongly bipartisan yea votes account for 41% of votes in the 97th Congress and 27% in the 117th; corresponding bipartisan nay shares are 13% and 3%. A single ideological ordering can conceal senators who join different coalitions in different contexts. Conversely, fitting correlations through direct pairwise couplings can require thousands of parameters for roughly 1,000 roll calls per session. [[concepts/latent-context-voting-models|Latent-Context Voting Models]] offer a compact representation in which shared context induces correlations among otherwise conditionally independent voters.

## Contributions

- Extends a restricted Boltzmann machine formulation to ternary, multidimensional contexts and heterogeneous voter preferences, with one consensus dimension shared by all voters.
- Evaluates collective vote distributions as well as individual means and pairwise covariances.
- Visualizes context-dependent partisan and bipartisan coalitions and decomposes joint entropy into context and conditional voter terms.
- Derives connections between latent context and effective interactions, retaining higher-order terms and qualifying pairwise reductions by approximation and geometry.

## Method

For senator $i$, the vote is $s_i\in\{-1,1\}$ and preferences are a vector $\mathbf h_i\in\mathbb R^K$. A shared context $\boldsymbol\sigma\in\{-1,0,1\}^K$ activates, reverses, or suppresses each preference dimension. The effective field is $h_i^{\mathrm{eff}}=\boldsymbol\sigma\cdot\mathbf h_i$. The normalized conditional vote distribution implied by the joint model is

$$
P(\mathbf s\mid\boldsymbol\sigma)
=\prod_i\frac{\exp(s_i h_i^{\mathrm{eff}})}{2\cosh(h_i^{\mathrm{eff}})}.
$$

The joint energy model in Equation 6 defines

$$
P_K(\mathbf s)=\frac{1}{Z_K}
\sum_{\boldsymbol\sigma}
\exp\left[\sum_i s_i(\boldsymbol\sigma\cdot\mathbf h_i)-g(\boldsymbol\sigma)\right].
$$

Here $g$ parameterizes contextual energy. Summing the joint model over votes gives the context marginal

$$
Q(\boldsymbol\sigma)=\frac{e^{-g(\boldsymbol\sigma)}}{Z_K}
\prod_i 2\cosh(\boldsymbol\sigma\cdot\mathbf h_i).
$$

Thus context frequencies depend on both $g$ and the voter fields; they are not simply the normalized exponential of $-g$. One component of every $\mathbf h_i$ is constrained to the same value, allowing context to favor consensus toward yea or nay. Thus $K=3$ includes two heterogeneous preference dimensions and one consensus dimension.

The paper fits Bayesian posteriors using NumPyro's Hamiltonian Monte Carlo No-U-Turn Sampler, reporting 1,000 independently initialized chains, $5{,}000K$ steps, and tree depth 6. Discrete rotation and reflection symmetries create equivalent parameterizations, which are aligned across samples. Adding the consensus constraint improves the numerical fits relative to unconstrained fields.

Conditional independence gives the joint-entropy decomposition (Equation 13)

$$
H(\mathbf s,\boldsymbol\sigma)
=H(\boldsymbol\sigma)+\sum_i
\mathbb E_{\boldsymbol\sigma}[H(s_i\mid\boldsymbol\sigma)].
$$

This separates uncertainty in context from each voter's residual uncertainty given context. It concerns the joint distribution, not the entropy of observed votes alone.

Marginalizing symmetric binary context produces effective even-order interactions, including pairwise and four-body terms; asymmetric context can introduce odd orders. Appendix A derives approximate Ising-type couplings for Gaussian context under a weak-field expansion. Hopfield-style dot-product couplings require isotropic field second moments or the vanishing-field limit; anisotropy modifies them. Circle and sphere contexts yield Bessel expansions under the stated approximation, rather than a universal exact reduction to pairwise interactions.

## Experiments

The observational analysis uses Voteview Senate roll calls and congress-legislators metadata. The main text describes 1971-2025 coverage; Appendix B labels maps from the 92nd through the 119th Congress. Filtering transient senators retains about 94% of votes cast, generally with 97-100 senators per session, with three smaller exceptions. Missing votes are unobserved rather than a third modeled voting state. Simulated margin checks reproduce the observed absence patterns.

For the median-voter checks, voters are selected by their average recorded vote, rather than by a separately estimated ideological score. Writing their empirical joint distribution as $\widehat P$, Equation 12 measures the fraction of multi-information captured as

$$
\mathrm{MI}=1-\frac{D_{\mathrm{KL}}(\widehat P\Vert P_K)}
{D_{\mathrm{KL}}(\widehat P\Vert P_0)},
$$

where $P_0$ is the independent-voter baseline. Zero denotes baseline performance and one a perfect distributional fit; the reported 90% is not individual-vote classification accuracy.

| Check | Reported finding | Scope |
| --- | --- | --- |
| Winning-margin distributions, means, and covariances | $K=3$ fits closely; $K=4$ adds modest gains, particularly in earlier sessions | Figures 1-3; posterior fit diagnostics |
| Joint distributions of 11 median voters | About 90% of multi-information captured from the 105th Congress onward; roughly 70-80% in earlier sessions | Equation 12 normalizes KL divergence against independent voting; earlier distributions are less well sampled |
| Other median-group sizes | Checks span odd group sizes 3-15 | Figure 6; uncertainty grows when configurations are sparsely sampled |
| Entropy trends | Context entropy falls about 1 bit for $K=3$ and 1.5 bits for $K=4$; reported individual-voter declines are about 0.3 and 0.4 bits | Figures 5 and 7; the voter comparisons are per-voter quantities, not their sum |
| Preference maps | The 117th Congress has fewer bipartisan projections than the 97th; Sanders changes relative partisan position across contexts, whereas Manchin remains intermediate | Figure 4; fitted coordinates, not externally labeled policy dimensions |

The discussion reports context entropies of roughly 3-4 bits for $K=3$ and 4-5 bits for $K=4$, including recent Congresses. Polarized voting therefore coexists with multiple probable contexts in this representation. No held-out prediction split or matched empirical benchmark against W-NOMINATE or a fitted Ising model is reported in the supplied text.

## Limitations

- The inferred contexts have not been matched to bill provisions or voting procedures. The interpretation that collective agenda choices explain polarization remains model-based, and latent common context cannot by itself distinguish causal influence among senators from shared exposure.
- The context-entropy decline exceeds the reported per-voter declines, but this comparison does not establish that it exceeds the change in their sum in Equation 13. Nor does that equation directly decompose observed vote entropy: $H(\mathbf s)=H(\mathbf s,\boldsymbol\sigma)-H(\boldsymbol\sigma\mid\mathbf s)$.
- Roll calls are selected by institutional procedures. Absences, commonly 5-10% per senator, are not modeled behaviorally; the simulated margin checks assume absence patterns can be applied independently of votes.
- The full distribution over approximately $2^{100}$ voting configurations cannot be tested directly. Median-voter subsets provide a demanding but partial check, and earlier sessions have greater sampling uncertainty.
- Posterior sampling faces equivalent parameterizations and potentially multiple modes. The supplied methods do not specify a concrete prior family and hyperparameters. Reproduction code is promised without an identifiable repository link.

The date above is the manuscript compilation date. The supplied Markdown gives no DOI, arXiv identifier, or confirmed publication venue for this paper.

## Related Concepts

- [[concepts/latent-context-voting-models|Latent-Context Voting Models]]: shared context induces collective dependence among conditionally independent voters.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: different projections can support different coalitions; fitted $K$ is not an effective-rank measure.
- [[concepts/political-polarization|Political Polarization]]: legislative voting alignment is distinct from affective polarization or citizen extremism.

## Related Papers

- Lee and Cantwell (2024), "Valence and interactions in judicial voting": cited precursor incorporating consensus and interactions in judicial voting.
- Lee, Broedersz, and Bialek (2015), "Statistical Mechanics of the US Supreme Court": cited pairwise maximum-entropy account of collective judicial voting.
- Kruis and Maris (2016), "Three representations of the Ising model": cited connection between latent-variable and interaction representations.
- [[papers/why-are-us-parties-so-polarized-a-satisficing-dynamical-model|Why are U.S. Parties So Polarized? A 'Satisficing' Dynamical Model]]: cited account of party polarization through voter satisfaction and party adjustment; models electoral competition rather than a joint distribution of Senate votes.
- [[papers/multidimensional-party-polarization-in-europe-cross-cutting-divides-and-effective-dimensionality|Multidimensional Party Polarization in Europe: Cross-Cutting Divides and Effective Dimensionality]]: related Wiki reading, not cited by this manuscript; measures cross-cutting dimensions in party positions rather than latent roll-call context.

[[index|Library home]]

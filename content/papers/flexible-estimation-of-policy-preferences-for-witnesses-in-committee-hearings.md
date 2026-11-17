---
title: Flexible Estimation of Policy Preferences for Witnesses in Committee Hearings
type: paper
authors:
  - Kevin M. Esterling
  - Ju Yeon Park
year: 2024
source_job_id: "54702542-3801-4a0f-a711-879df592a662"
doi: 10.1017/pan.2024.6
tags:
  - political-methodology
  - preference-measurement
  - legislative-hearings
---

## TL;DR

A Bayesian model recovers committee witnesses’ policy preferences from legislator–witness communication while allowing their relationship to ideology to differ from legislators’ roll-call preferences. In Medicare hearings, the flexible estimates reveal more questioning of nearby witnesses, especially falsifiable questioning; conventional one-dimensional bridging yields null associations.

## Research Question

How can researchers measure preference distance between legislators and outside experts when institutional roles make their policy preferences differ from a shared left–right ideology scale?

## Motivation

Roll-call positions reflect electoral, party, donor, and personal incentives. Experts may instead prioritize substantive policy trade-offs. Mapping both actor types onto the same line can therefore obscure the preferences relevant to their interactions, even when common ideological survey items are available.

## Contributions

- Recovers latent witness preferences within a model of dyadic communication, rather than imputing them exclusively from legislators’ ideology-to-roll-call mapping.
- Allows the witness preference dimension to shift and rotate relative to that mapping; conventional constrained bridging is a special case.
- Uses question types, organizational expertise, and testimony content to assess the substantive interpretation of the recovered dimension.

## Method

For witness $i$, legislator $j$, and sentence type $m$, the model uses Poisson counts with log rate

$$
\log \lambda_{ij}^{m}=\beta_0^m+\beta_1^m(L_j-\zeta_i)^2+\beta_2^mR_i+\beta_3^m(L_j-\zeta_i)^2R_i+\eta_{ij}+\eta_j+\eta_i.
$$

Here $L_j$ is observed first-dimension DW-NOMINATE, $\zeta_i$ is latent witness preference, and $R_i$ indicates a research organization. Normal random effects account for legislator, witness, and dyad variation, including overdispersion. Bayesian MCMC jointly estimates preferences and communication parameters.

Optional bridging equations relate common ideology $\psi$ to legislator and witness preferences through respective means $\alpha_0+\alpha_1\psi_j$ and $(\alpha_0+\alpha_2)+(\alpha_1+\alpha_3)\psi_i$. The constrained model sets the shift and rotation parameters to zero. The flexible model learns them; bridging data can improve precision and describe geometry but are not necessary for preference recovery.

Identification requires repeated dyads for each witness and communication that actually depends on preference distance. The witness-preference variance is fixed to the observed legislator-preference variance to establish scale. The nonlinear distance term distinguishes witness preference from a witness-level intercept (Section 3).

## Experiments

The application samples 29 Medicare hearings held during 2000–2003 across 12 committees and subcommittees: 67 witnesses, 87 legislators, and 669 dyads. Sentence counts distinguish falsifiable, opinion, and anecdotal statements; 37% of witnesses represent research-based organizations. An optional five-item ideology survey bridges witnesses and former members of Congress.

- **Constrained baseline:** No significant preference-distance relationship appears for any sentence type or either organizational group (Figure 1).
- **Flexible model:** Greater distance predicts fewer falsifiable and opinion sentences, most strongly for falsifiable discourse. Differences by research affiliation support the authors’ information-seeking interpretation (Figure 3).
- **Geometry:** The supplied text characterizes the relationship between constrained and flexible witness estimates as nearly orthogonal, rather than a shared one-dimensional scale (Figure 2); it does not provide a numerical angle estimate.
- **Model checks:** The paper reports lower WAIC for all three outcomes and improved posterior predictive fit; numerical WAIC tables are in supplementary material, not the supplied Markdown.
- **Alternative bridge:** Substituting contribution-based CF scores reportedly reproduces the principal patterns with greater uncertainty. Using those scores directly as preferences again yields null results.
- **Content interpretation:** Topic-stratified word frequencies in written testimony associate proximity to conservatives with costs and proximity to liberals with care and beneficiaries, supporting a cost–quality interpretation (Figure 4).

## Limitations

Preference recovery fails when communication is unrelated to preference distance or witnesses lack repeated dyads. The observational application concerns one policy domain and period; its patterns do not establish causal effects or prove that legislators update beliefs during hearings. The authors explicitly leave open whether interactions instead reflect prior staff preparation. Preferences and outcome associations are jointly estimated, so their association is model-based evidence rather than an independent validation sample. The survey bridge assumes former members’ personal ideology remains stable over time. Supplementary simulations and detailed diagnostics are referenced but are not available in the supplied text.

## Related Concepts

- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: a common ideological scale need not capture the distinct policy commitments relevant to cross-institutional communication.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: distinguishes likelihood-preserving coordinate ambiguity from this paper’s substantive rotation between actor-specific preference mappings.

## Related Papers

- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: supplies the Bayesian roll-call scaling background cited for legislator preference measurement.
- Jessee (2016), “(How) Can We Estimate the Ideology of Citizens and Political Elites on the Same Scale”: cited for difficulties with common-scale measurement across actor populations.
- Crawford and Sobel (1982), “Strategic Information Transmission”: motivates the relationship between preference proximity and informative communication.

Replication data: DOI `10.7910/DVN/ZU5QTG`.

---
title: "Differential Privacy in Generative AI Agents: Analysis and Optimal Tradeoffs"
type: paper
authors:
  - Ya-Ting Yang
  - Quanyan Zhu
year: null
tags:
  - differential-privacy
  - llm-agents
  - decoding
  - privacy-utility-tradeoff
---

## TL;DR

The paper models an LLM agent's responses as randomized outputs conditioned on an enterprise dataset. Under a uniform bound $\Delta$ on how much one record can change any token logit, temperature-scaled softmax gives a token privacy bound $2\Delta/T$ and a fixed-length message bound $2\Delta L/T$. A GPT-2 case study reports lower empirical distributional leakage at higher temperatures, alongside lower logit-based utility. The proposed temperature optimization supplies a conditional first-order equation, but its stated objective does not establish a finite global optimum.

## Research Question

How do sampling temperature and response length affect disclosure about individual records in an agent-accessible dataset, and how can these controls be related to response utility?

## Motivation

Enterprise agents can expose internal information indirectly through their responses, even when they do not reproduce confidential records verbatim. The authors seek a dataset-level privacy criterion that complements prompt filters, sanitization, and other guardrails, particularly when the underlying database changes. The protected object is a record in the agent's accessible dataset; this is distinct from guaranteeing privacy for every user prompt or for model training data.

## Contributions

- Represents agent generation as an autoregressive stochastic mechanism conditioned on a prompt, dataset, and contextual information.
- Introduces token and message privacy definitions and derives pure-DP bounds from uniform logit sensitivity and sequential composition.
- Relates temperature to expected utility through a covariance identity under an additional message-level Gibbs assumption.
- Proposes a temperature-reward objective and illustrates temperature and length effects using GPT-2 responses to a cybersecurity-database query.

## Method

### Dataset Adjacency and Generation

Neighboring datasets $D\sim D'$ differ in one record. For a fixed prompt and other context, message-level $(\varepsilon,\delta)$-[[concepts/differential-privacy|Differential Privacy]] requires

$$
\Pr(M(D)\in S)\leq e^\varepsilon\Pr(M(D')\in S)+\delta
$$

for every output event $S$. Tokens are sampled sequentially from $\pi_D(w\mid h)\propto\exp(\ell_D(w,h)/T)$, where $h$ contains the token prefix and conditioning context (Sections III-IV).

### Privacy Bounds

Proposition 1 assumes $\sup_{w,h}|\ell_D(w,h)-\ell_{D'}(w,h)|\leq\Delta$ for every neighboring pair. Both the unnormalized token weights and the softmax normalizer contribute at most $\Delta/T$ to the log probability ratio. Consequently, each step satisfies pure DP with parameter $2\Delta/T$. Sequential composition gives Corollary 1's sufficient message budget

$$
\varepsilon_{\mathrm{message}}=\frac{2\Delta L}{T}
$$

for a fixed length $L$. This is an upper bound on privacy loss, not an equality for actual leakage. Increasing $T$ tightens the bound; increasing $L$ enlarges it. Applying this [[concepts/differentially-private-decoding|Differentially Private Decoding]] analysis requires a valid global sensitivity bound.

### Utility and Temperature Selection

For fixed length, Section V assumes a message distribution $\pi_T(m)\propto\exp(U(m)/T)$, where $U(m)$ is the sum of token logits. With bounded utility $\nu(m,L)$, Proposition 2 derives

$$
E_L'(T)=-\frac{1}{T^2}\operatorname{Cov}_{\pi_T}(\nu,U).
$$

Expected utility is nonincreasing when that covariance is nonnegative. The proposed objective is $\max_{T>0}\{E_L(T)+\lambda T/L\}$ for $\lambda\geq0$, using temperature as a privacy proxy. Proposition 3 states that any interior optimum must satisfy $\lambda/L=\operatorname{Cov}_{\pi_{T^*}}(\nu,U)/(T^*)^2$. This is a necessary stationarity condition under the stated assumptions.

## Experiments

Section VI uses GPT-2 to answer which attack type is most frequent in a cybersecurity incident database, comparing prompts containing neighboring datasets $D$ and $D'$. It reports sampling 250 responses for each length $L\in\{2,5,10\}$ while varying temperature from 0.1 to 2.0.

Outputs are mapped to a finite label space and converted to empirical distributions with Laplace smoothing. The reported metrics are the maximum absolute log ratio of smoothed label probabilities, total variation distance, and Jensen-Shannon divergence. The utility proxy is $\nu(m,L)=\exp(U(m))+0.1L$.

The authors report that all three leakage measures generally decrease with temperature (Figure 1). Cumulative logit score and the utility proxy also decrease, while their covariance remains nonnegative over the tested range (Figure 2). Longer responses accumulate more logit and information scores and may modestly increase leakage and utility variation. The supplied text gives qualitative trends rather than a table of numerical improvements or a demonstrated optimal temperature.

## Limitations

The following mathematical qualifications are reading notes on the supplied formulation, distinct from the authors' reported findings:

- **Sensitivity must be established.** The paper assumes a uniform $\Delta$ but does not provide a certified bound for GPT-2 or an enterprise system. Temperature alone therefore does not certify a chosen privacy budget. A fixed or uniformly capped response length is also needed for a common message budget; repeated interactions require additional accounting.
- **Approximate-DP definition gap.** Definition 3 imposes its additive $\delta_k$ inequality on individual tokens. For $\delta_k>0$, this alone does not imply the same inequality for arbitrary token sets, as required for Lemma 1's standard approximate-DP composition argument. The pure-DP softmax result, where $\delta_k=0$, avoids this issue.
- **Additional Gibbs assumption.** An autoregressive product contains prefix-dependent softmax normalizers. It does not generally equal a single globally normalized exponential of summed raw logits. Proposition 2's covariance formula therefore needs its separate Gibbs assumption; it does not follow automatically from the earlier generation model.
- **Unbounded optimization objective.** With bounded $E_L(T)$ and $\lambda>0$, $E_L(T)+\lambda T/L$ grows without bound as $T\to\infty$. As written, Equation (5) has no finite global maximizer. A stationary-point equation does not resolve this problem; a bounded temperature domain or different regularization would be needed.

Empirically, smoothed probabilities over sampled output labels do not certify worst-case DP over all messages, prompts, histories, and neighboring datasets. The text does not specify the incident records, label mapping, smoothing value, or sufficient repetition details to reproduce the plotted uncertainty. The exponential-logit utility is not an independent measure of factual accuracy or enterprise usefulness. Larger models, enterprise datasets, realistic utility measures, joint control of length and temperature, and multi-agent privacy analysis remain future work (Section VII).

The supplied Markdown does not state this paper's publication year, venue, DOI, or arXiv identifier. These metadata are left unasserted.

## Related Concepts

- [[concepts/differential-privacy|Differential Privacy]]
- [[concepts/differentially-private-decoding|Differentially Private Decoding]]

## Related Papers

The following relationships come from Section II and the supplied bibliography; these papers do not yet have library pages.

- Majmudar et al. (2022), "Differentially private decoding in large language models" [10]: decoding-stage privacy protection, discussed as an alternative to privacy-preserving retraining.
- Thareja et al. (2025), "DP-Fusion: Tokenlevel differentially private inference for large language models" [14]: bounds sensitive-context influence by blending output distributions with and without sensitive tokens.
- Koga et al. (2024), "Privacy-preserving retrieval-augmented generation with differential privacy" [7]: studies privacy at the retrieval stage, a related intervention point for database-connected generation.

[[index|Library home]]

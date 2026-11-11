---
title: Invisibilization as a Source of Probability Bias in Language Models
type: paper
authors:
  - Christian Arnold
  - Ernesto Calvo
  - Guadalupe Gonzalez
  - Sebastián Vallejo Vera
  - Tiago Ventura
year: null
tags:
  - algorithmic-fairness
  - language-models
  - belief-updating
---

[[index|Library home]]

## TL;DR

In a controlled two-urn experiment, models sometimes discard identical testimony at different rates depending on the reporter’s description. Higher trust among assessed Black-described reporters can mask this exclusion. Scoring trust against revealed outcomes reduces racial trust gaps in four of five tested configurations; fairness reminders can worsen exclusion.

## Research Question

Does avoiding judgments about protected attributes cause language models to discard useful evidence, and can audits distinguish this information loss from differential trust among assessed sources?

## Motivation

An audit restricted to answered or assessed cases misses whose testimony receives no weight. Even overall average trust can conceal offsetting selection and evaluation effects. The paper calls this mechanism [[concepts/invisibilization-in-language-models|invisibilization]].

## Contributions

- A two-urn benchmark holds evidence constant while randomizing reporter descriptions.
- A decomposition separates the probability of declining assessment from trust conditional on assessment.
- Tests compare wording, language, reasoning effort, warning instructions, and repeated scoring with verified outcomes.

## Method

The model observes a public chip, estimates a reporter’s reliability, and updates its belief about the generating urn. Actual reporter reliability is 0.8 but is not disclosed. For red-chip share $p>1/2$, a red report with assigned reliability $q$ contributes

$$
\ell(q)=\log\frac{(1-p)+q(2p-1)}{p-q(2p-1)}.
$$

At $q=0.5$, the report contributes no information. The authors define this exact value as a decline, separately from API refusals. With decline rate $\pi(m)$ and assessed mean trust $d(m)$, the reliability-scale deficit is $\Delta(m)=\pi(m)[d(m)-0.5]$. Overall trust equals $d(m)-\Delta(m)$; the Black–white mean gap equals the assessed-trust gap minus $\Delta(B)-\Delta(W)$.

The design uses 22 descriptions, 30 sessions per description, and ten configurations from OpenAI and Anthropic: 6,600 English sessions, plus 2,760 Spanish sessions. Descriptions include an undescribed baseline, placebos, race or nationality labels, and race × gender × professor/pupil combinations. Model names are retained as reported in the supplied manuscript.

## Experiments

- **Selection versus evaluation:** Table 2 reports decline rates of 0.46 versus 0.09 for Black- versus white-described reporters under luna high, pooled across five cells per group. Assessed trust is 0.85 versus 0.81; deficits are 0.162 versus 0.027, giving a differential deficit of 0.135 and an overall mean gap of −0.094.
- **Heterogeneity:** Opus never declines in 1,320 sessions; terra has negative differential deficits because white-described reporters are declined more often. Haiku and Sonnet show no significant racial decline difference in the factorial analysis. The effect is not universal across configurations.
- **Effort and wording:** The estimated factorial selection effect for luna rises from 0.21 to 0.39 with higher effort. Rationales invoke some identity words but not their translations or related labels; these explanations do not establish internal mechanisms.
- **Instruction remedies:** A warning about inaccurate reports raises luna-low declines from 34% to 72% for Black-described reporters and from 13% to 37% for white-described reporters. An instruction to ignore descriptions produces declines of 63–93% across groups.
- **Outcome feedback:** Repeated sessions compare no scoring, scoring without revealed truth, and scoring with revealed truth. The quadratic score is $1-(\hat q_t-y_t)^2$. The abstract reports late-round racial trust gaps below 0.02 in four of five configurations. Scoring without truth often increases declines; with truth, luna-low reliability rises from about 0.51 to 0.76.

## Limitations

The experiment isolates description effects in a synthetic task; it does not demonstrate downstream hiring or triage outcomes. Actual reliability is unknown to the model, so demographic parity and recovery of the true reliability are distinct objectives. Professor/pupil descriptions confound age and status. Haiku’s arithmetic errors weaken the assumption that stated reliability fully determines evidence use. Selection bounds rely on a monotonicity assumption. Verified feedback may be unavailable or biased in practice. Code and data are promised upon publication, and the referenced supplement is not included in the supplied Markdown.

The supplied manuscript states no publication year or stable paper identifier; year is therefore left unspecified. Its scoring narrative is less explicit about the fifth configuration than its abstract, so the four-of-five summary is retained.

## Related Concepts

- [[concepts/invisibilization-in-language-models|Invisibilization in Language Models]]
- [[concepts/probability-calibration|Probability Calibration]]: proper scores evaluate stated reliability against observed truth.

## Related Papers

- Röttger et al. (2024), *XSTest*: cited for exaggerated safety behavior on benign requests.
- Khorramrouz and Levy (2025), *Characterizing selective refusal bias in large language models*: cited for demographic differences in refusal.
- Gneiting and Raftery (2007), *Strictly proper scoring rules, prediction, and estimation*: supplies the scoring framework used in the feedback intervention.

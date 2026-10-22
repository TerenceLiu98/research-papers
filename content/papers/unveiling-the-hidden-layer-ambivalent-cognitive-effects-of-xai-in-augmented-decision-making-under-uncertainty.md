---
title: "Unveiling the Hidden Layer: Ambivalent Cognitive Effects of XAI in Augmented Decision-Making under Uncertainty"
type: paper
authors:
  - Tizian Matschak
  - Ilja Nastjuk
  - Simon Trang
  - Jose Benitez
year: null
tags:
  - explainable-ai
  - human-ai-decision-making
  - calibrated-reliance
  - automation-bias
---

## TL;DR

Local feature-based explanations can improve scrutiny of a fallible AI recommendation while also making the AI seem more competent and responsible for the outcome. In a 200-person car-price classification experiment, perceived transparency directly reduced harmful changes to initially correct judgments, but its positive indirect effects through competence-based trust and responsibility attribution were larger. The result is competitive mediation: explainability can strengthen [[concepts/automation-bias|Automation Bias]] even while supporting one mechanism of [[concepts/calibrated-reliance|Calibrated Reliance]].

## Research Question

How does explainability alter reliance on fallible AI recommendations under uncertainty, and can explanation-induced transparency produce unintended cognitive effects that increase harmful reliance?

## Motivation

Explainable AI is often designed on the premise that transparency helps users distinguish correct from incorrect recommendations. That premise focuses on deliberate evaluation but underweights other cognitive responses. An explanation can also act as a cue of competence, make the AI appear to be a causal participant, and reduce the user's felt ownership of the final decision. The paper separates beneficial consultations, in which a correct AI recommendation repairs an initially incorrect human judgment, from negative consultations, in which an incorrect recommendation displaces an initially correct judgment.

## Contributions

- Conceptualizes explainability as a cognitively ambivalent intervention rather than a uniformly beneficial transparency feature.
- Identifies competence-based trust and responsibility attribution as parallel pathways through which perceived transparency can increase reliance on erroneous recommendations.
- Shows that explanation effects are asymmetric: the proposed cognitive pathways predict negative consultations but not positive consultations.
- Reframes explainability as a reliance-shaping design mechanism and proposes safeguards aimed at calibration, including independent judgments before AI exposure, uncertainty and limitation cues, explicit responsibility framing, and justification prompts.

## Method

The authors organize the model with stimulus-organism-response theory and interpret its cognitive pathways through dual-process theory. Explanation provision is the stimulus; perceived transparency, competence-based trust, and responsibility attribution are cognitive states; positive and negative consultations are behavioral responses.

Participants first classified whether each car cost more or less than $15,000, then saw an AI recommendation, and finally made a decision. The treatment group also saw a local feature-based SHAP explanation. The underlying random-forest classifier achieved 98% accuracy and 0.98 AUC on a 1,000-item test sample, but selected inputs were adversarially manipulated to create controlled classification errors for the experiment. Each participant completed 12 tasks without performance feedback.

The study measured perceived transparency and competence-based trust with four items each, and responsibility attribution with three adapted items plus one study-specific item. Consultation outcomes were derived from actual decision changes. The authors estimated a structural equation model using robust maximum-likelihood standard errors and checked the count outcomes with negative-binomial regressions.

## Experiments

The between-subjects online experiment collected 200 valid Prolific responses in March 2025: 102 participants received explanations and 98 did not. Mean age was 37, the sample was evenly split between respondents identifying as women and men, and average completion time was 13.65 minutes. Participants rated task difficulty at 5.78 on a seven-point scale. A manipulation check found higher perceived explanatory information with XAI than without it (means 4.24 versus 2.86; $F(1,198)=61.78$, $p<.001$).

The structural model had acceptable reported fit ($\chi^2=237.651$, $df=119$, RMSEA 0.071, CFI 0.962, TLI 0.948, SRMR 0.051). Key paths were:

- Explanations increased perceived transparency ($b=0.192$, $p=.006$).
- Perceived transparency directly reduced negative consultations ($b=-0.255$, $p=.045$) but did not significantly increase positive consultations ($b=0.029$, $p=.825$).
- Transparency increased competence-based trust ($b=0.796$, $p<.001$) and responsibility attribution ($b=0.664$, $p<.001$).
- Competence-based trust ($b=0.265$, $p=.019$) and responsibility attribution ($b=0.327$, $p<.001$) each increased negative consultations; neither significantly predicted positive consultations.
- For negative consultations, the indirect effects through trust ($b=0.211$, $p=.018$) and responsibility attribution ($b=0.217$, $p=.001$) produced a total indirect effect of $b=0.428$ ($p<.001$). Perceived transparency's total effect on negative consultations was positive ($b=0.173$, $p=.015$), despite its negative direct path.

Negative-binomial robustness models retained the same focal pattern for negative consultations. Alternative interaction and reciprocal models for trust and responsibility fit worse than the proposed parallel-path model.

## Limitations

- The experiment used one local explanation method (SHAP), one low-stakes car-price task, and one fixed AI accuracy profile; effects may differ for counterfactual, rule-based, or natural-language explanations and for consequential domains.
- The authors interpret the results with dual-process theory but do not directly measure System 1 or System 2 processing. Attention, conflict, or effort measures would be needed to identify these processes more directly.
- The design deliberately set experimental AI accuracy to 50% using adversarial perturbations. This supports balanced observation of correct and incorrect recommendations but may make fallibility unusually salient.
- The cross-sectional experiment does not capture whether repeated exposure gradually shifts users from recommendation-level scrutiny toward task-level delegation.
- Consultation counts were zero-inflated and overdispersed. Negative-binomial checks supported the negative-consultation findings, but positive-consultation effects remained absent.

## Related Concepts

- [[concepts/calibrated-reliance|Calibrated Reliance]]
- [[concepts/automation-bias|Automation Bias]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]
- [[concepts/cognitive-offloading|Cognitive Offloading]]

## Related Papers

These works are discussed in the supplied paper; matching library pages were not found.

- Buçinca, Malaya, and Gajos (2021), "To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-Assisted Decision-Making": motivates independent reasoning as a safeguard against overreliance.
- Schemmer et al. (2022), "On the Influence of Explainable AI on Automation Bias": directly connects explanation provision and biased reliance.
- Cecil et al. (2024), "Explainability Does Not Mitigate the Negative Impact of Incorrect AI Advice in a Personnel Selection Task": provides related evidence that explanations need not repair the effects of incorrect advice.
- Zhang et al. (2020), "Effect of Confidence and Explanation on Accuracy and Trust Calibration in AI-Assisted Decision Making": studies explanation and confidence as determinants of calibrated trust.

[[index|Library home]]

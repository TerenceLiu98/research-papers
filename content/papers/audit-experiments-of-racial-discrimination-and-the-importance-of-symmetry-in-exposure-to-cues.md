---
title: "Audit Experiments of Racial Discrimination and the Importance of Symmetry in Exposure to Cues"
type: paper
authors:
  - Thomas Leavitt
  - Viviana Rivera-Burgos
year: 2024
doi: "10.1017/pan.2024.3"
source_job_id: "c59fc551-1e32-4ce7-9de3-9d912a88447d"
tags:
  - experimental-design
  - causal-inference
  - discrimination
---

## TL;DR

Holding a nonracial cue constant in an email body does not isolate discrimination beyond inferred attributes when the racial cue can affect whether the email is opened. Leavitt and Rivera-Burgos derive the resulting estimand mismatch and propose exposing recipients to both cues before opening, or withholding both until after a treatment-independent opening decision.

## Research Question

How can audit experiments distinguish responses to racial cues from responses to nonracial attributes inferred from those cues when exposure occurs in stages?

## Motivation

A legislator can see a racially distinctive sender name before opening an email, but learn that the sender is a copartisan only after opening it. Identical body text therefore does not ensure identical opportunities to encounter the additional information. This complements the belief-content problem in [[concepts/information-equivalence|Information Equivalence]] with a problem of exposure timing.

## Contributions

- Defines the mechanism-relevant estimand among recipients who would open under either racial assignment.
- Derives the bias of the overall reply-rate contrast relative to this estimand.
- Presents two designs that restore symmetry of cue exposure, with different target populations.
- Develops bounds, sensitivity analysis, and estimation strategies with absent, imperfect, or accurate opening measurements.

## Method

Under SUTVA, complete random assignment, and no replying without opening, potential opening decisions define Always-Open (AO), Only-White-Open (OWO), Only-Black-Open (OBO), and Never-Open strata. Treatment is a Black alias and control a white alias. With racial cues outside and copartisanship inside the email, the target is the reply effect among AO recipients, who can encounter both cues under either assignment.

Writing stratum proportions as $\pi_s$ and effects as $\tau_s$, the ordinary difference in means is unbiased for the overall effect $\tau$, but its bias for $\tau_{AO}$ is (Equation 5):

$$
E[\hat\tau]-\tau_{AO}=(\pi_{AO}-1)\tau_{AO}+\pi_{OWO}\tau_{OWO}+\pi_{OBO}\tau_{OBO}.
$$

**Cues before opening.** Place both race and copartisanship signals in visible sender/subject information. The overall ATE then matches the intended cue contrast because all recipients can encounter both signals before deciding to open.

**Cues after opening.** Make pre-opening information independent of assignment and put both cues inside. The identifying condition is individual-level $m_i(1)=m_i(0)$, not merely equal aggregate opening rates. For a positive AO proportion, Equation 6 gives $\tau_{AO}=\tau/\pi_{AO}$. The overall effect is a lower bound in magnitude with the same sign. Observed replies give a lower bound on the opening proportion; measured opens plus replies among measured non-openers tighten it under no false positives.

If the opening proportion is known, scale the reply difference by its inverse. Accurate individual opening measurements additionally permit a post-stratified comparison among openers, with both treatment groups represented. Conditioning on observed opening in the original asymmetric design does not have this justification. Conservative variance estimation and asymptotic inference accompany the estimators; scaling by $1/\pi_{AO}$ scales variance by $1/\pi_{AO}^2$.

## Experiments

This is a methodological paper with proofs and illustrative calculations, not a new field estimate of discrimination. Figure 2 uses a hypothetical experiment with 6,000 legislators and a reply proportion of 0.55 to illustrate sensitivity to the unknown AO proportion. Rescaling a point estimate and its standard error changes magnitude and interval width but preserves whether the interval excludes zero. The paper also describes supplementary worked examples and R code for opening measured with and without error.

A diagnostic rejects absence of false negatives if any reply comes from an email recorded as unopened. Under the maintained assumptions this has zero Type I error. Non-rejection is not logical proof of accurate measurement: power depends on whether hidden openers would reply under the assigned conditions.

## Limitations

Pre-opening signals may be unnatural; moving cues into the body can change their implicit or explicit character and the population that opens. Email previews or displayed sender details must not reveal treatment in the second design. Low opening rates can reduce power. Tracking pixels can produce false positives from security scanning and false negatives from blocking; the proposed bounds require the stated measurement assumptions. Tracking also adds privacy costs beyond observing replies. The AO estimand addresses a particular mechanism question and does not supersede the substantive importance of overall discrimination.

## Related Concepts

- [[concepts/information-equivalence|Information Equivalence]]: fixing an additional signal is useful only if recipients can encounter it at the relevant decision stage.

## Related Papers

- [[papers/do-name-based-treatments-violate-information-equivalence-evidence-from-a-correspondence-audit-experiment|Do Name-Based Treatments Violate Information Equivalence? Evidence from a Correspondence Audit Experiment]]: examines multiple attributes signaled by names; this paper addresses unequal exposure to additional signals intended to separate such attributes.
- Butler and Broockman (2011), “Do Politicians Racially Discriminate against Constituents?”: motivates the running example of holding copartisanship constant.
- Frangakis and Rubin (2002), “Principal Stratification in Causal Inference”: provides the framework for strata defined by potential opening decisions.

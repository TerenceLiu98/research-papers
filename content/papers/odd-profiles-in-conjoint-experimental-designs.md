---
title: "Odd Profiles in Conjoint Experimental Designs: Effects on Survey-Taking Attention and Behavior"
type: paper
authors:
  - Kirk Bansak
  - Libby Jenke
year: 2025
doi: "10.1017/pan.2025.1"
source_job_id: "eadd400a-cdc3-474f-99da-c912e8ab388d"
tags:
  - conjoint-experiments
  - eye-tracking
  - survey-methodology
---

## TL;DR

In preregistered candidate- and immigrant-choice conjoint experiments with 147 respondents, odd attribute combinations produced small, inconsistent changes in attention and choice. The authors recommend prioritizing substantive theory and statistical design over concerns that odd profiles will undermine survey-taking behavior.

## Research Question

Do unusual or implausible attribute combinations change respondents’ overall attention, allocation of attention, search sequence, or sensitivity to attributes in conjoint choices?

## Motivation

Independent randomization can produce profiles such as a doctor without a graduate degree or a candidate whose party and policy positions conflict. Excluding these combinations changes the design and potentially the target estimand. Behavioral evidence is therefore needed to assess whether concerns about confusion, distraction, or reduced effort justify restrictions.

## Contributions

- Distinguishes incongruent combinations from generally implausible, nonsensical combinations.
- Combines choice outcomes with direct gaze measurements to test competing attention mechanisms.
- Compares both experimental conditions and realized oddness within conditions across two substantive scenarios.
- Finds limited behavioral sensitivity even with deliberately frequent odd combinations, informing practical design priorities.

## Method

Each respondent completed 60 paired-profile tasks in each of two scenarios, choosing political candidates and immigrants seeking U.S. residency. Tables contained eight attributes. Four conditions—normal, incongruent, nonsensical, and combined—each comprised 15 tasks. Scenario and condition order were randomized. Attribute levels were independently and uniformly randomized within each condition; attribute order was randomized across respondents and conditions, then held fixed within a condition.

[[concepts/eye-tracking|Eye Tracking]] used a Tobii T60XL at 60 Hz. Table cells served as areas of interest. Outcomes included fixation counts, attributes viewed at least once, viewing duration, and within-profile versus within-attribute gaze transitions. Within-condition attention regressions included respondent fixed effects. Choice analyses estimated average marginal component effects using linear regressions on attribute-level indicators. Uncertainty was clustered by respondent.

Changing conditions sometimes required changing attributes or levels, so between-condition contrasts do not isolate oddness alone. Within-condition analyses avoid these substitutions, although realized oddness remains tied to particular attribute combinations. The authors use multiple comparisons and robustness analyses to assess consistency rather than treating isolated significance as decisive.

## Experiments

The convenience sample came from the Duke Fuqua Behavioral Research subject pool in June–September 2022: 147 participants, 65% students and 35% other community members. Repeated tasks yielded over 17,000 table observations, approximately 35,000 profiles; these are not independent respondents.

- **Overall attention:** All 36 standardized point estimates in Table 2 were below 0.04 in absolute magnitude. Some fixation effects were statistically significant, but they did not consistently recur across scenarios or in the combined condition.
- **Attribute attention:** Most effects were small and statistically insignificant. The largest absolute standardized effects were 0.16 for candidates and 0.04 for immigrants; significant effects varied in direction.
- **Search sequence:** The reported supplementary transition analyses found little evidence of substantial changes toward within-profile search.
- **Choice:** Splitting combined-condition profiles by odd-combination counts produced no systematic AMCE differences. In normal-versus-nonsensical comparisons, significant differences appeared only for levels whose substantive content changed. Additional models found no significant odd-combination-count coefficient at p < 0.05.
- **Robustness:** Viewing-duration and first-condition analyses gave similar conclusions. Additional cumulative-exposure analyses also found little evidence of effects; these cumulative analyses were not preregistered.

Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/6PXYGY). Supplementary results are summarized as reported in the supplied article, rather than independently reanalyzed.

## Limitations

The educated, predominantly Democratic convenience sample and laboratory eye-tracking setting limit generalization to online surveys and other populations. Only two scenarios, eight-attribute displays, and pairwise odd combinations were studied. Oddness classifications were preregistered but subjective, and individual respondents’ perceptions were not established. Attribute substitutions complicate between-condition attribution, especially for choice. Small average effects do not rule out offsetting individual responses or effects in other settings. The interpretation that respondents evaluate attributes largely separately is suggestive, not a uniquely identified cognitive mechanism.

## Related Concepts

- [[concepts/eye-tracking|Eye Tracking]]: fixation and transition measures reveal information acquisition beyond observed choices.

## Related Papers

- [[papers/attention-and-political-choice-a-foundation-for-eye-tracking-in-political-science|Attention and Political Choice: A Foundation for Eye Tracking in Political Science]]: complementary guidance on gaze measurement and the limits of psychological inference.
- Jenke et al. (2021), “Using Eye-Tracking to Understand Decision-Making in Conjoint Experiments”: prior work on conjoint complexity and information acquisition cited by this study.
- De la Cuesta, Egami, and Imai (2022), “Improving the External Validity of Conjoint Analysis: The Essential Role of Profile Distribution”: addresses a statistical design consideration that remains important despite limited behavioral effects of oddness.

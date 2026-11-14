---
title: "Crossing Over: Majority Party Control Affects Legislator Behavior and the Agenda"
type: paper
authors:
  - Nicholas G. Napolio
  - Christian R. Grose
year: 2021
doi: 10.1017/S0003055421000721
tags:
  - legislative-politics
  - causal-inference
  - political-parties
---

## TL;DR

Deaths and replacements in the 1953–1954 US Senate temporarily changed numerical party control while committee leadership remained fixed. Napolio and Grose find that Democratic floor control shifted the roll-call agenda toward revising conservative status quos and shifted Republicans’ estimated revealed preferences rightward. The study isolates floor majority power from electoral turnover and committee reorganization.

[[index|Library home]]

## Research Question

Does numerical majority-party control itself change the legislative agenda and senators’ voting behavior, even when committee organization and pivotal preferences remain largely stable?

## Motivation

Electoral transfers of chamber control also change membership, electoral mandates, and committee composition. These simultaneous changes complicate identification of party effects. The relatively weak and internally heterogeneous parties of the mid-century Senate offer a demanding setting for testing majority influence.

## Contributions

- Uses nine deaths among 96 senators in the 83rd Congress to study changes in floor majorities within one Congress.
- Separates numerical floor control from pre-floor committee organization, which the authors report remained unchanged.
- Measures both agenda shifts through vote cutpoints and behavioral shifts through senator ideal points; supplements the historical design with longer-run correlational evidence.

## Method

The authors partition roll calls into regimes of constant Senate membership, creating a new regime after a death or replacement. Bayesian roll-call models estimate two-dimensional senator ideal points, bridging regimes by fixing four ideologically extreme senators. The main text emphasizes the economic first dimension; racial second-dimension results are assigned to the appendix.

In the one-dimensional notation, the model is $P(Y_{ij}=1)=\Phi(\beta_j x_i-\alpha_j)$, with cutpoint $c_j=\alpha_j/\beta_j$. Cutpoints mark indifference between a proposal and its status quo, rather than directly measuring enacted policy. Under the paper’s spatial interpretation, higher cutpoints during Democratic control indicate consideration of more conservative status quos for liberal revision.

OLS compares standardized cutpoints across party-control regimes. Separate Democratic and Republican senator-regime regressions include senator fixed effects and regime-clustered standard errors. Comparisons use all regimes, neighboring regimes 5–7, and second-session regimes. Identification rests on deaths being as-if random with respect to the outcomes and on the absence of consequential contemporaneous changes.

## Experiments

This is an observational natural experiment, supplemented by historical correlations.

| Outcome: Democratic versus Republican control | All regimes | Regimes 5–7 | Second session |
| --- | ---: | ---: | ---: |
| First-dimension cutpoint, SD units | 1.135 | 1.216 | 1.166 |
| Roll calls | 237 | 70 | 114 |
| Republican ideal point, SD units | 0.527 | 0.423 | 0.691 |
| Democratic ideal point, SD units | 0.197 | 0.025 | 0.267 |

Tables 1–2 report all cutpoint and Republican coefficients as significant at p < 0.01; the aggregate Democratic coefficients are not significant. Republican senator-regime sample sizes are 408, 135, and 180; Democratic sample sizes are 395, 134, and 175. The neighboring-regime Republican estimate is 0.423 SD, despite the prose’s broader claim of increases exceeding half a standard deviation in all models.

Mean cutpoints in regimes 5, 6, and 7 are −0.1, 1.1, and −0.2, respectively; regime 6 is the Democratic interval. The authors report effects for nonsouthern but not southern Democrats in Appendix G, and stronger effects on the economic than racial dimension. Those appendix details are not supplied in the parsed text.

Across 23,909 roll calls in the 80th–116th Congresses (1947–2018), the reported party-control association is 0.11 SD in cutpoints. This provides broader descriptive corroboration, not a second exogenous identification strategy.

## Limitations

The identifying episode contains one short Democratic-control regime and comparatively few votes. Generalization beyond this historical Senate requires care. Causal interpretation depends on the authors’ exogeneity and stable-context assumptions; senator fixed effects address time-invariant confounding, not all time-varying shocks. Estimated ideal points describe behavior on the observed agenda, so movement need not imply changes in underlying ideological commitments. The supplied Markdown omits the referenced appendices and footnote detail, limiting assessment of robustness and bridging choices. The year above follows the supplied 2021 copyright and replication reference.

## Related Concepts

- [[negative-agenda-control|Negative Agenda Control]]: numerical floor majorities can block unfavorable proposals independently of committee control.
- [[conditional-party-government|Conditional Party Government]]: the case probes party effects in a setting with weaker cohesion than contemporary party-government accounts emphasize.

## Related Papers

- [[the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: supplies the Bayesian ideal-point framework used for agenda and behavior measurement.
- Den Hartog and Monroe (2019), *The Jeffords Switch*: the authors contrast their death-induced variation with a strategic party switch that also changed committee organization.

Replication data: https://doi.org/10.7910/DVN/7WUTWA.

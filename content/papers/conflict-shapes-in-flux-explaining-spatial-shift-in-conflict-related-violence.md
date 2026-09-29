---
title: "Conflict shapes in flux: Explaining spatial shift in conflict-related violence"
type: paper
authors:
  - Annette Idler
  - Katerina Tkacova
year: 2024
doi: "10.1177/01925121231177445"
journal: International Political Science Review
volume: 45
issue: 1
pages: "31-52"
tags:
  - armed-conflict
  - spatial-analysis
  - mixed-methods
  - conflict-actors
---

## TL;DR

Idler and Tkacova argue that newly dominant conflict actors can redirect violence toward territories offering local support, recruitment, income, and comparatively low risks. Two paired plausibility probes cover six periods across four conflicts: all three periods with a new dominant actor exhibit spatial shift, whereas the three without one do not. Network measures, geographic overlap, interviews, and process tracing support the mechanism's plausibility, rather than estimate a general causal effect.

## Research Question

How does a change in dominant actors influence the location of violence in multi-actor armed conflicts, separately from expansion or contraction of the affected area?

## Motivation

Violence can move into places where armed actors already exercise influence without much fighting. Treating armed conflict as identical to observed violent events obscures this distinction. Tracking changes in both actor constellations and violence-affected territories may help explain where humanitarian needs emerge.

## Contributions

- Proposes **low-risk/high-opportunity attraction**: a newly dominant actor pivots fighting toward territories where it can build violent capacity through support networks, terrain knowledge, recruits, or income.
- Defines [[concepts/conflict-shapes|Conflict Shapes]] as time-varying areas directly affected by violence, distinguishing spatial shift from changes in area.
- Combines related conflict dyads into an umbrella conflict and measures actor prominence across their violent engagements.
- Integrates network and spatial analysis with process tracing, including field interviews, in paired comparisons of expanding and contracting conflicts.

## Method

The theory concerns multi-actor armed conflicts whose original contested issue involves at least one state and one non-state actor; the empirical focus is intra-state and internationalized intra-state conflict. A dominant actor ranks first or second in annual violent engagements with other actors. The paper calls this degree centrality, operationalized through event involvement rather than simply the number of distinct opponents. Dominance here is not a direct measure of territorial control or military capability.

Using UCDP GED 18.1, the authors combine relevant dyads and construct concave hulls around event locations, adding a 50 km buffer. Getis-Ord hotspot analysis identifies concentrations of violence. A shift occurs when the arithmetic mean of conflict-shape overlap and hotspot overlap is below 50%; expansion or contraction requires an area increase or decrease of at least 20%. These overlap measures compare the shapes across periods and the hotspots across periods, not hotspots against their enclosing polygon. Multi-year comparisons also examine intermediate shapes to assess the trend.

The study pairs Syria/Iraq with the Afghan-Pakistani borderlands for expansion and Lake Chad with Colombia for contraction. It draws on 12 in-depth interviews for Syria/Iraq and 95 for Colombia, expert interviews for all four conflicts, and secondary literature. Process tracing examines whether support bases and capacity-building opportunities plausibly connect actor changes to spatial shifts. ACLED is used for a Lake Chad robustness check; alternative Wzone polygons are discussed in the appendix, which is not included in the supplied Markdown.

## Experiments

These are observational plausibility probes, not randomized experiments. The overlaps below are reported in Figures 1-6; the mean column is calculated from those reported percentages using the paper's rule.

| Case and period | New dominant actor | Shape overlap | Hotspot overlap | Mean overlap | Classification |
| --- | --- | --- | --- | --- | --- |
| Syria/Iraq, 2010-2013 | Syrian government | 58.9% | 0% | 29.45% | Shifting expansion |
| Syria/Iraq, 2014-2016 | None | 93.1% | 74.2% | 83.65% | Expansion without shift |
| Afghan-Pakistani borderlands, 2006-2008 | None | 96.4% | 56.1% | 76.25% | Expansion without shift |
| Lake Chad, 2011-2016 | ISWAP | 48.3% | 42.7% | 45.50% | Shifting contraction |
| Colombia, 2006-2011 | None | 88.8% | 78.7% | 83.75% | Contraction without shift |
| Colombia, 2012-2016 | ELN | 91.3% | 0% | 45.65% | Shifting contraction |

For Syria/Iraq in 2010-2013, the authors connect Syrian government dominance to support from the Alawite community and familiarity with infrastructure in government strongholds. For Lake Chad, they emphasize ISWAP's cross-border ethnic ties, local support, and recruitment opportunities. For Colombia in 2012-2016, the ELN's growing prominence accompanies a shift toward Arauca and parts of Norte de Santander, where the group had local influence and income from illicit cross-border activity.

The negative comparisons matter: the Afghan government and Taliban remain dominant despite the TTP's emergence; the earlier Colombian period retains government and FARC dominance; and Syria/Iraq's later expansion occurs without replacement of the dominant actors. Actor entry alone is therefore distinct from becoming dominant. Colombia's later period also illustrates why whole-shape overlap alone can miss a shift in major battlegrounds.

## Limitations

- Six selected periods provide plausibility evidence; they do not establish that dominant-actor replacement is universally necessary or sufficient for spatial shift.
- The study does not explain why some actors become dominant, and it leaves the role of lower-ranked actors and systematic state/non-state differences for future work.
- Shapes summarize recorded violence, not every territory under armed influence or exposed to recruitment, intimidation, or extortion. Local shifts may be missed by the aggregate classification.
- Results depend on event coverage, the polygon construction, the 50 km buffer, hotspot estimation, comparison periods, and classification thresholds. The supplied main text does not specify enough implementation detail, including the overlap denominator, to independently reconstruct every calculation.
- Interviews and process tracing provide uneven evidence across cases: original stakeholder interviews center on Iraq and Colombia, while other cases rely more on expert knowledge and secondary accounts.
- The paper reports robustness work in supplementary material, but that material is absent from the supplied source. Its results are not independently verified here.
- The source contains apparent extraction damage and inconsistent geographic wording for Syria. This summary avoids resolving those location details by guesswork. The year follows the 2024 journal issue; the source also displays a 2023 copyright notice.

## Related Concepts

- [[concepts/conflict-shapes|Conflict Shapes]]: separates the changing footprint of violence from wider armed influence.
- [[concepts/social-network-analysis|Social Network Analysis]]: represents violent interactions and changes in actor prominence.
- [[concepts/spatial-autocorrelation|Spatial Autocorrelation]]: provides context for geographic clustering and hotspot analysis; clustering alone does not identify the proposed mechanism.

## Related Papers

- Beardsley, Gleditsch, and Lo (2015), "Roving Bandits? The geographical evolution of African armed conflicts." Cited research on changing conflict geography.
- Kikuta (2022), "A New Geography of Civil War: A machine learning approach to measuring the zones of armed conflicts." Cited alternative for constructing conflict zones; the authors discuss differences in event inclusion and fatality weighting.
- Levy (2008), "Case Studies: Types, designs, and logics of inference." Cited methodological basis for plausibility probes.
- [[papers/the-geometry-of-conflict-3d-spatio-temporal-patterns-in-fatalities-prediction|The geometry of conflict: 3D Spatio-temporal patterns in fatalities prediction]]: a thematic library connection, not a citation in this article. It uses spatiotemporal fatality patterns for forecasting, while this paper uses violence footprints to investigate actor-linked spatial change.

Source: [Publisher DOI](https://doi.org/10.1177/01925121231177445). The supplied paper also identifies an [authors' code and extended-appendix repository](https://github.com/Global-Security-Programme/Conflict-shapes-in-flux); those external materials were not used for this summary.

[[index|Library home]]

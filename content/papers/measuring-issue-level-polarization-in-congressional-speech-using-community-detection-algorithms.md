---
title: "Measuring issue-level polarization in congressional speech using community detection-algorithms"
type: paper
authors:
  - Hendrik Erz
year: 2026
doi: "10.1017/nws.2026.10049"
tags:
  - political-polarization
  - topic-modeling
  - legislative-behavior
  - network-analysis
---

## TL;DR

Topic-based speech similarity networks reveal increasing separation in congressional economic issue attention from the 1980s, especially in the House. Leiden modularity measures clustering in what legislators discuss; it does not identify disagreement over positions on the same issue. Party affiliation explains little of the historical network structure, with stronger associations in recent decades.

## Research Question

Can differences in legislators’ issue attention measure polarization over time, and does economic discourse show distinct patterns across the House and Senate or along party lines?

## Motivation

Roll-call and partisan-language measures do not directly capture whether legislators prioritize different issues. Economic discourse can become divided through attention to taxation, spending, or welfare even when a measure of positions on a single economic dimension misses that separation.

## Contributions

- Combines topic modeling, speaker profiles, cosine similarity, and community detection into a measure of issue-attention polarization.
- Compares all-topic and economic-topic networks using pooled and chamber-specific topic models.
- Separates community structure from party alignment through assortativity and permutation-based network comparisons.

## Method

The corpus combines historical Congressional Record speeches from 1873–2011 with additional records covering 2012–2025. The historical portion contains approximately 17 million speeches from around 7,000 speakers; these figures are not totals for the extended corpus.

LDA uses 500 topics, with alpha 0.5 and beta 0.1. A pooled model supplies the main analysis, while separately trained House and Senate models check chamber differences. Economic topics are selected through inspection of their top ten words and representative speeches; the main model contains 13 such topics (Table 1).

Each speech is assigned its highest-loading topic. Counts aggregated by speaker and two-year Congress form 500-dimensional profiles. Pairwise cosine similarities define weighted networks, with a separate analysis restricted to economic topics. Leiden community detection yields modularity scores, compared over time rather than interpreted as absolute polarization levels. Louvain and walktrap are described as robustness comparisons.

Party assortativity measures alignment with party membership. Quadratic assignment procedure (QAP) compares the speech network to a same-party network using 1,000 permutations. This tests network association, not a causal effect of party membership (Sections 3–4).

## Experiments

- **Overall discourse:** Figure 2 reports a U-shaped historical modularity pattern, with greater clustering early in the series and renewed increases later. Senate increases begin earlier and are more pronounced than House increases in the all-topic analysis.
- **Economic discourse:** Economic modularity rises strongly from the 1980s, especially in the House. The paper reports that House economic modularity more than doubles over the final twenty years; exact plotted values are not tabulated in the supplied text.
- **Party alignment:** Figure 3 shows generally low party assortativity, with a marked rise in House economic discourse from the 2000s. Figure 4 reports that many earlier associations are not significant under QAP, while all-topic networks and House economic networks show more consistently low p-values from the mid-1980s. Statistical significance should be distinguished from the magnitude of assortativity.
- **Validation scope:** The text references supplementary hyperparameter and algorithm checks, but their detailed results are not included in the supplied Markdown.

## Limitations

Topic selection and interpretation require researcher judgment. A fixed topic vocabulary enables comparison but cannot eliminate historical language change; the historical data also contain OCR errors absent from the later born-digital records. Assigning one topic per speech discards secondary topics, and attention similarity cannot distinguish opposing stances expressed about the same issues.

Modularity depends on the network construction and community-detection baseline. The study offers descriptive trends rather than a causal explanation of economic polarization or legislative gridlock. The source inconsistently reports 75 congressional cycles in the profile construction and 69 in the results, while also naming the 43rd through 118th Congresses; the precise analyzed coverage requires clarification. The supplied DOI appears in the supplementary-material statement, and the publication year is inferred from that identifier. Code is described as available on request.

## Related Concepts

- [[concepts/issue-attention-polarization|Issue-Attention Polarization]]
- [[concepts/expressed-agendas|Expressed Agendas]]
- [[concepts/political-polarization|Political Polarization]]
- [[concepts/social-network-analysis|Social Network Analysis]]

## Related Papers

- [[papers/a-bayesian-hierarchical-topic-model-for-political-texts-measuring-expressed-agendas-in-senate-press-releases|A Bayesian Hierarchical Topic Model for Political Texts]]: related library work on comparable actor-level attention profiles; Erz instead aggregates hard topic assignments and analyzes their network structure.
- Waugh et al. (2011), *Party Polarization in Congress: A Network Science Approach*: cited methodological precedent for network-based polarization measurement.

[[index|Library home]]

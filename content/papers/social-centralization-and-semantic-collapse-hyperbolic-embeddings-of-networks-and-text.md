---
title: "Social Centralization and Semantic Collapse: Hyperbolic Embeddings of Networks and Text"
type: paper
authors:
  - Linzhuo Li
  - Lingfei Wu
  - James Evans
year: 2020
doi: 10.1016/j.poetic.2019.101428
tags:
  - social-networks
  - semantic-networks
  - hyperbolic-embeddings
  - science-of-science
  - cultural-diversity
---

## TL;DR

The paper embeds institutional collaboration networks and physics topic co-occurrence networks in comparable two-dimensional Poincare disks, using radius to represent hierarchy and angular spread to represent diversity. In American Physical Society data, institutions that converge socially also converge topically; broader Web of Science evidence likewise associates larger collaborations with lower vocabulary entropy. These are strong observational associations, not an identified causal effect of collaboration on idea diversity.

## Research Question

Can social centralization and semantic diversity be measured in a common geometry, and does increasing collaboration coincide with contraction in the range of topics and language used in science?

## Motivation

Connections across social groups can benefit the individuals who bridge them by exposing those actors to novel information and combinations. At the system level, however, repeated contact may also increase imitation, competition, and convergence, reducing the stock of distinct ideas available for future recombination. Existing network and cultural analyses often measure these two sides separately. The paper proposes a shared geometric representation for studying their [[Social-Semantic Coevolution|coevolution]].

## Contributions

- Represents institutional collaboration and topic co-occurrence networks in comparable hyperbolic spaces whose radial and angular coordinates operationalize hierarchy and diversity.
- Relates changes in pairwise institutional collaboration distance to changes in the topical positions of those institutions in 2002-2011 APS publications.
- Checks the geometric findings with conventional network-density and entropy measures.
- Extends the descriptive pattern beyond physics using 13 million Web of Science articles across seven fields, more than 200 subfields, and approximately 10,000 journals.

## Method

The primary analysis uses 359,395 APS papers and their Physics and Astronomy Classification Scheme (PACS) codes. Name-disambiguated authors are aggregated into annual collaboration networks among 290 prolific institutions. A separate network links PACS codes that co-occur in papers; it contains 5,856 nodes and 244,106 edges.

The authors fit two-dimensional Poincare embeddings with a learning rate of 0.5 and 50 negative samples. In each disk, smaller radius indicates a more central hierarchical position, while angular proximity indicates social or semantic similarity. An institution's topical position is derived from the distribution of PACS codes in its publications. Pairwise social and semantic hyperbolic distances are then compared across institutions and years, and ordinary least squares slopes summarize whether each pair converges or diverges over time.

For external validation, the paper uses Web of Science metadata from 13 million articles published during 1994-2013. Average collaborators measure social densification, while normalized entropy over abstract words measures topic spread. The appendix also reports lagged Granger-prediction analyses, which assess temporal predictability rather than establishing causal identification.

## Experiments

Across annual APS embeddings, social and semantic distances are strongly positively associated. The correlation between pairwise social and semantic convergence slopes is 0.98 ($p<0.001$). At the institution-to-system level, changes in social and semantic radius correlate at 0.85 ($p<0.001$). The semantic distance range contracts over the study period, particularly among initially less-connected institutions.

Conventional measures point in the same direction: higher institutional clustering accompanies lower entropy over PACS codes. In the broader Web of Science analysis, average team size rises while normalized abstract-word entropy falls across the seven analyzed fields. Cross-sectional regressions are negative across 13 major fields, more than 200 subfields, and approximately 10,000 journals; for the 13-field analysis, reported annual slopes range from -0.01 to -0.03, with 85% significant at $p<0.05$ and all marginally significant at $p<0.1$.

Lagged analyses suggest bidirectional prediction. For institution pairs, 67% of significant regressions from current social distance to next-year topical distance have positive coefficients, compared with 57% in the reverse direction. The paper interprets this asymmetry as moderate evidence that collaboration precedes topical convergence, while recognizing that selection and socialization remain intertwined.

## Limitations

The central evidence is observational. Shared interests can produce collaboration just as collaboration can produce shared interests, and Granger prediction does not resolve that causal ambiguity. The primary hyperbolic analysis covers a short 2002-2011 window and a deliberately conservative domain, academic physics.

Pairwise distances are estimated within common network embeddings and are therefore dependent observations, a dependence not fully represented when the paper summarizes percentages across many fitted models. Institution and author disambiguation is imperfect. The broader Web of Science analysis also substitutes team size and lexical entropy for the richer hyperbolic measures, so it validates a related pattern rather than directly replicating the primary geometry across every field.

Finally, lower entropy or angular spread is not automatically harmful: convergence can reflect coordination, cumulative progress, or movement toward better-supported ideas. The analyses establish contraction in measured semantic variety, not a general decline in scientific quality or creativity.

## Related Concepts

- [[Social-Semantic Coevolution]]
- [[Riemannian Representation Learning]]
- [[Geodesic Distance]]
- [[Social Network Analysis]]
- [[Research Diversification]]

## Related Papers

- Nickel and Kiela (2017), "Poincare Embeddings for Learning Hierarchical Representations."
- Krioukov et al. (2010), "Hyperbolic Geometry of Complex Networks."
- Roth and Cointet (2010), "Social and Semantic Coevolution in Knowledge Networks."
- Lorenz et al. (2011), "How Social Influence Can Undermine the Wisdom of Crowd Effect."
- March (1991), "Exploration and Exploitation in Organizational Learning."

[[index|Library home]]

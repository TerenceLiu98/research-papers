---
title: "Multiple Partitioning of Multiplex Signed Networks: Application to European Parliament Votes"
type: paper
authors:
  - Nejat Arinik
  - Rosa Figueiredo
  - Vincent Labatut
year: null
source_job_id: "6571d5c2-232a-425d-a53c-61d4e49b7f6a"
tags:
  - signed-networks
  - roll-call-voting
  - multiplex-networks
  - correlation-clustering
---

## TL;DR

The paper identifies recurring parliamentary coalitions by partitioning each roll-call network, clustering similar partitions, and computing a representative partition for each cluster. Applied to 232 agricultural roll calls for French and Italian members of the European Parliament in 2012-13, it separates consensus from several antagonistic configurations that an annually aggregated network obscures. Matching votes can still express opposing policy motivations, so the authors interpret patterns using amendments and political documents.

## Research Question

How can a network analysis recover both cohesive groups of voters and the particular legislative documents that produce different coalition configurations?

## Motivation

Averaging agreement over many votes can mix persistent consensus, alternating alliances, abstention, and rare conflict. A single partition of that aggregate cannot recover which bills elicited each configuration. The proposed [[concepts/voting-pattern-clustering|Voting Pattern Clustering]] approach retains one signed network per roll call and groups documents according to the voter partitions they induce.

## Contributions

- A four-stage analysis of multiplex signed networks that returns several characteristic voter partitions, each associated with a cluster of legislative documents.
- Explicit handling of abstention as a possible faction and of unanimity as a valid pattern, without filtering unanimous votes or weak averaged links at extraction.
- Case studies that recover changing socialist and liberal alignments, a rare environmentalist-conservative alignment in France, and minority conflict hidden by predominant consensus in Italy.

## Method

### Roll-Call Layers and Partitions

Each layer contains the same MEP node set. Two participating MEPs receive a positive edge if their votes match and a negative edge otherwise; FOR, AGAINST, and ABSTAIN are distinct categories. Absent MEPs are isolates and are excluded from the pattern. The authors compare excluding abstainers with retaining them, and report only the latter because it exposes informative abstentionist factions (Sections 3.2 and 4.1).

Exact correlation clustering, implemented through integer programming as Ex-CC, finds factions that maximize positive edges within factions and negative edges between them. This is the structural-balance objective used in [[concepts/signed-political-networks|Signed Political Networks]].

### Comparing and Clustering Patterns

Patterns are compared over MEPs present in both. The authors examine purity, Rand index, adjusted Rand index, and normalized mutual information. They symmetrize purity using the harmonic mean of its two directions, and favor it after testing manually ranked archetypal partition pairs. Small changes in individual membership should matter less than changes in the main factions (Section 4.2).

K-medoids clusters the resulting dissimilarity matrix. The number of clusters is selected using silhouette scores together with qualitative differences between characteristic patterns. The medoid is an observed partition; it is distinct from the consensus pattern computed next. Section 4.3 reports approximate silhouette values of 0.65 for purity, 0.67 for Rand index, 0.36 for normalized mutual information, and 0.44 for adjusted Rand index. These are internal clustering criteria, not prediction accuracies.

### Characteristic Patterns

Within each cluster, the authors construct a weighted signed network. A pair's weight is the proportion of jointly observed patterns placing its members together minus the proportion placing them apart. Patterns with either MEP absent do not enter that pair's denominator. MEPs participating in fewer than half the cluster's roll calls are removed, and Ex-CC produces the characteristic partition (Section 4.4).

Aggregation therefore occurs after grouping similar voting configurations. It summarizes each configuration while preserving its associated documents, rather than mixing all configurations into one annual network.

## Experiments

### Data and Comparison

The source dataset, from It's Your Parliament, covers the seventh European Parliament term (2009-14). The detailed evaluation considers French and Italian MEPs on 232 agriculture-related roll calls in the 2012-13 legislative year, during Common Agricultural Policy reform. It compares interpretations with Arinik et al. (2017), who partitioned a filtered, annually integrated signed vote-similarity network using correlation clustering and relaxed correlation clustering.

The authors manually annotate document subdomains using EUR-Lex and inspect amendments, party positioning documents, and speeches. This is a descriptive case study, without a held-out prediction task or independent ground-truth coalition labels.

### French Patterns

The highest silhouette occurs at three clusters, but the authors choose five to retain substantively distinct configurations. Counts below come from Section 5.4; percentages are calculated from those counts.

| Characteristic pattern | Roll calls | Share |
| --- | ---: | ---: |
| Unanimity | 100 | 43.1% |
| Conservatives versus the rest, with Euroskeptic abstention | 34 | 14.7% |
| Environmentalists versus the rest, with part of the far left abstaining | 74 | 31.9% |
| S&D/EPP versus GUE-NGL/G-EFA/ALDE, with Euroskeptic abstention | 18 | 7.8% |
| G-EFA/ALDE/EPP versus GUE-NGL/S&D, with Euroskeptic abstention | 6 | 2.6% |

The largest cluster reveals substantial consensus hidden by the integrated network. The other clusters confirm that S&D and ALDE sometimes align with the left and sometimes with the right, while also showing that they do not always move together. The six-vote configuration brings environmentalists and conservatives into the same faction. Inspection of green-payment amendments shows that environmentalists sought stronger requirements while conservatives sought weaker ones: identical voting behavior did not mean identical preferences.

The source calls the six-vote share 2% in Section 5.4.5 and 3% in the figure caption; 6/232 is approximately 2.6%. The count is retained here rather than choosing one inconsistent rounded label.

### Italian Patterns

Appendix D selects four clusters to distinguish unanimity from quasi-unanimity, although that choice does not maximize silhouette.

| Characteristic pattern | Roll calls | Share, calculated |
| --- | ---: | ---: |
| Unanimity | 130 | 56.0% |
| Quasi-unanimity with a small dissenting faction | 67 | 28.9% |
| S&D/ALDE versus the rest | 26 | 11.2% |
| EPP/ECR versus the rest, with an individual abstentionist faction | 9 | 3.9% |

The method separates rare, relatively balanced antagonistic blocs from overwhelming consensus. All roll calls in the French unanimity cluster belong to the Italian unanimity cluster, but the Italian cluster includes additional votes that divide French MEPs. Across both countries, clusters are heterogeneous in policy subdomain, so topic labels alone do not explain coalition formation.

## Limitations

- Time is not modeled explicitly. Layers represent separate roll calls without temporal coupling.
- The empirical demonstration concerns one policy domain, one legislative year, and two national delegations. Applying the method to the full Parliament is proposed future work.
- Selecting the similarity measure and cluster count incorporates analyst judgment. Silhouette and qualitative interpretability can favor different choices.
- Exact correlation clustering may become computationally costly at larger scale; the authors suggest approximate solvers as an extension.
- Amendment prevalence can favor consensus patterns, and coarse document topics do not capture the direction of proposed changes. The authors call for further substantive interpretation and possible text analysis.
- Recorded roll calls exclude show-of-hands votes. Absence handling and the within-cluster participation threshold also shape which MEPs contribute to characteristic patterns.
- Common votes establish behavioral alignment, not shared motivation or a causal alliance. Appendix D also identifies a time-specific party-affiliation error in the underlying data.
- The supplied Markdown does not establish this paper's publication year, venue, DOI, or other stable identifier. The year is left null.

## Related Concepts

- [[concepts/voting-pattern-clustering|Voting Pattern Clustering]]: groups legislative documents by recurring voter partitions.
- [[concepts/signed-political-networks|Signed Political Networks]]: distinguishes agreement and disagreement in political relations.
- [[concepts/roll-call-vote-selection|Roll-Call Vote Selection]]: addresses the relationship between recorded votes and the broader voting process.
- [[concepts/latent-context-voting-models|Latent-Context Voting Models]]: a related statistical perspective on context-dependent collective voting, rather than the partition-clustering procedure used here.

## Related Papers

- Arinik, Figueiredo, and Labatut (2017), "Signed graph analysis for the interpretation of voting behavior": the integrated-network baseline reexamined in the case studies.
- Lancichinetti and Fortunato (2012), "Consensus clustering in complex networks": the cited basis for constructing representative partitions, adapted here to signed networks.
- [[papers/legislative-prediction-via-random-walks-over-a-heterogeneous-graph|Legislative Prediction via Random Walks over a Heterogeneous Graph]]: cited as a voter-bill network approach combining political and textual similarity for prediction; its objective differs from recovering recurring coalition patterns.

[[index|Library home]]

---
title: "Measuring Discretion and Delegation in Legislative Texts: Methods and Application to US States"
type: paper
authors:
  - Matia Vannoni
  - Elliott Ash
  - Massimo Morelli
year: 2021
doi: 10.1017/pan.2020.9
tags:
  - text-as-data
  - legislative-politics
  - bureaucratic-discretion
---

## TL;DR

Dependency parses and legal extraction rules turn statutes into counts of delegations, constraints, permissions, and entitlements. US state applications associate civil-service merit reforms with greater legislative detail and unified government with more delegation to governors. Validation is stronger for delegation than for constraints.

## Research Question

Can syntactic information in legislation provide scalable measures of bureaucratic discretion and executive delegation that recover established political relationships?

## Motivation

Word counts discard who is acting, negation, and grammatical voice. Manual legal coding preserves meaning but is costly and context-dependent. [[concepts/legislative-information-extraction|Legislative Information Extraction]] combines syntactic structure with explicit legal categories to bridge these approaches.

## Contributions

- Defines reproducible rules for four legal provision types using modal verbs, specialized verbs, negation, and voice.
- Validates automated counts against human annotations and modal-bigram counts.
- Applies the measures to historical US state session laws to study bureaucratic independence and partisan alignment.

## Method

spaCy supplies parts of speech and dependency relations. Rules identify the provision's subject and distinguish strict modals (shall, must, will) from permissive modals (may, can). For example, a nonnegated strict modal with an active verb indicates delegation, while a negated permission verb indicates a constraint. Table 1 also specifies rules for permissions and entitlements. Coreference resolution was omitted after sample checks suggested it did not change delegation measures.

Legislative detail is the log count of extracted legal provisions per state–biennium. More provisions are interpreted as less bureaucratic discretion; this is a proxy for statutory restriction, not direct observation of administrative behavior.

Executive delegation is $D/M-(C/M)(D/M)$, where $D$ counts delegation statements with governor as subject, $C$ counts governor constraint statements, and $M$ counts all statements in session legislation. The denominator and treatment of constraints are varied in robustness checks.

Panel regressions include state and biennium fixed effects, with state trends and other controls in selected specifications. Standard errors are clustered by state.

## Experiments

| Analysis | Reported evidence |
| --- | --- |
| European Communities validation | More than 150 acts from Franchino (2004); machine versus human counts have $R^2=0.44$ for delegation and $R^2=0.06$ for constraints. Machine counts identify about twice as many delegations, possibly because humans consolidate related statements. |
| US annotation validation | The authors report over 80% agreement with blind human annotations and fewer false positives and negatives than modal counting; details are in the supplementary appendix. |
| Civil-service reforms | Analysis covers 50 states, 1900–2000. Table 2, column 1 estimates 0.137 (SE 0.0625) on log provision counts, with 1,438 observations. Alternative specifications retain positive coefficients. |
| Unified government | Table 3, column 1 estimates 0.0054 (SE 0.003) on the delegation index, with 2,270 observations. Coefficients remain positive with trends, lagged outcomes, civil-service controls, and alternative outcomes. |

The reform event plot suggests no pretrend over the displayed two pre-reform biennia and an increase in detail in the next biennium. The authors interpret the pattern as consistent with legislators substituting detailed ex ante instructions for weaker ex post control. The unified-government results support the prediction that aligned principals and agents delegate more authority.

## Limitations

Constraint validation is weak, and the authors call for further validation in the US context. Annotation errors remain despite improvement over lexical baselines. Provision counts do not distinguish policy from procedural language, and statutory detail is an indirect measure of discretion. The legal ontology is not designed for nonlegal language; preliminary comparisons with general semantic role labeling are not a comprehensive benchmark. Panel associations and a short displayed pretrend window do not independently establish the proposed political mechanism. Supplementary checks are reported here as claims in the supplied article; the appendix itself was not supplied.

## Related Concepts

- [[concepts/legislative-information-extraction|Legislative Information Extraction]]: extracts legal provision types and actors from syntactic relations.
- [[concepts/semantic-role-based-narrative-mining|Semantic Role-Based Narrative Mining]]: shares relational text representation, but targets recurring narratives rather than legal authority.

## Related Papers

- [[papers/relatio-text-semantics-capture-political-and-economic-narratives|RELATIO: Text Semantics Capture Political and Economic Narratives]]: a library comparison using semantic roles and entity consolidation for political narratives, rather than legal provision rules.
- Franchino (2004), “Delegating Powers in the European Community”: supplies the human-coded validation corpus.
- Huber and Shipan (2002), *Deliberate Discretion?*: motivates legislative detail as a measure of constraints on bureaucracy.

Published in *Political Analysis* 29:43–57 (2021); first published online May 26, 2020. Replication data identifier reported in the article: 10.7910/DVN/FQTA4A.

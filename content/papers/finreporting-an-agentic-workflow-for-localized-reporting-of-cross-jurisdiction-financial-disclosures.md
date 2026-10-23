---
title: "FinReporting: An Agentic Workflow for Localized Reporting of Cross-Jurisdiction Financial Disclosures"
type: paper
authors:
  - Fan Zhang
  - Mingzi Song
  - Rania Elbadry
  - Yankai Chen
  - Shaobo Wang
  - Yixi Zhou
  - Xunwen Zheng
  - Yueru He
  - Yuyang Dai
  - Georgi Georgiev
  - Ayesha Gull
  - Muhammad Usman Safder
  - Fan Wu
  - Liyuan Meng
  - Fengxian Ji
  - Junning Zhao
  - Xueqing Peng
  - Jimin Huang
  - Yu Chen
  - Xue (Steve) Liu
  - Preslav Nakov
  - Zhuohan Xie
year: null
source_job_id: "ca0b7493-4cba-4ace-9dc2-94bd5a482d1f"
tags:
  - financial-reporting
  - cross-jurisdiction
  - agentic-workflows
  - llm-verification
  - financial-ontology
---

## TL;DR

FinReporting localizes annual financial statements from the United States, Japan, and China into a shared income-statement, balance-sheet, and cash-flow schema. Deterministic, jurisdiction-specific extraction produces candidate values; a constrained LLM may keep, repair, or escalate them using filing evidence; and unresolved cases go to expert review. Across 90 non-financial firms, the workflow is strongest on structured US XBRL filings and weakest on heterogeneous Chinese PDFs, showing both the value and the limits of ontology-guided [[concepts/cross-jurisdiction-financial-statement-localization|Cross-Jurisdiction Financial Statement Localization]].

## Research Question

Can heterogeneous financial disclosures be converted into a consistent home-market representation while retaining traceable evidence, explicit quality signals, and escalation paths for uncertain mappings or extractions?

## Motivation

Financial-reporting pipelines usually assume one jurisdiction, one taxonomy, and familiar accounting conventions. That assumption fails for cross-market analysis: equivalent concepts can use different labels, similar labels can encode different concepts, aggregation rules vary, and source infrastructure ranges from tagged XBRL to visually variable PDFs. Translation or format conversion alone cannot prevent semantic drift or incorrect roll-ups. Manual vendor curation addresses these issues but is costly and difficult to scale.

## Contributions

- Defines a unified ontology for core income-statement, balance-sheet, and cash-flow concepts across US, Japanese, and Chinese filings.
- Decomposes localization into filing acquisition, statement identification, extraction, canonical mapping, and output, with audit trails and anomaly logging between stages.
- Uses the LLM as a [[concepts/bounded-llm-verification|Bounded LLM Verifier]] rather than a free-form extractor, limiting its actions to `KEEP`, evidence-backed `REPAIR`, or `NEED_REVIEW`.
- Provides an interactive demo for inspecting localized statements, quality signals, provenance, template-based questions, and exported workbooks.

## Method

### Jurisdiction-Aware Processing

For US and Japanese XBRL filings, rule-based adapters select tagged facts using reporting context such as consolidation, period length, and instant-versus-duration semantics. For Chinese PDF filings, the pipeline detects statement pages, parses tables, selects columns with fallbacks, and labels each field `OK`, `MISSING`, `PARSE_ERROR`, or `NOT_APPLICABLE`.

The resulting items are mapped to a canonical financial ontology covering income statements, balance sheets, and cash-flow statements. Outputs retain localized labels and units while sharing a concept inventory for comparison and downstream use.

### Verification and Escalation

At each stage, predefined rules and filing evidence bound the LLM's decision. A proposed repair is accepted only for a repairable field, typically one marked missing or unparsable, when the cited context explicitly supports the replacement and the value agrees with that evidence. Otherwise the item is marked `NEED_REVIEW`. Decisions, evidence, anomalies, and failure reasons are logged. Expert review is reserved for escalated cases and large discrepancies, connecting the workflow to [[concepts/human-oversight-of-ai|Human Oversight of AI]].

## Experiments

The evaluation covers 30 non-financial firms in each of three jurisdictions: a 20-company baseline split for rule development and gold annotation, plus a held-out 10-company challenge split. Experts manually validate the gold mappings and numerical consistency. Evaluation uses 18 shared canonical fields: five income-statement, seven balance-sheet, and six cash-flow targets.

The paper reports Filled Rate (non-null output coverage), Conflict Rate (fields escalated because deterministic and LLM results disagree or evidence is insufficient), and accuracy against manual labels over reviewed fields. With GPT-4o as verifier, FinReporting reaches 95.56 Filled Rate, 15.56 Conflict Rate, and 90.23 accuracy for US filings, compared with 94.44, 5.56, and 89.38 for the naive LLM reporting baseline. It matches that baseline on Japan at 84.44, 15.56, and 88.36. For China, it raises Conflict Rate from 26.67 to 40.56 and accuracy from 78.15 to 82.11 while Filled Rate remains 63.33, indicating more escalation alongside higher reviewed-field accuracy.

On US filings, all six tested LLM backbones have the same 95.56 Filled Rate and approximately 90.00-90.23 accuracy despite reported costs ranging from $1.47 to $36.96. The authors interpret this as evidence that coverage is primarily determined by the pipeline rather than verifier scale. DeepSeek-Chat is an outlier with a 100.00 Conflict Rate, illustrating that similar accuracy does not imply similar review burden.

## Limitations

- The evaluation covers only annual filings from the United States, Japan, and China, 90 non-financial firms, and 18 shared core fields.
- Chinese PDF extraction remains sensitive to layout variation, fragmented tables, OCR noise, and issuer-specific conventions; its Filled Rate is substantially below the XBRL-based US result.
- A predefined ontology can omit long-tail concepts and jurisdiction- or firm-specific accounting nuance. Localized outputs are aligned representations, not authoritative restatements.
- The system still requires expert review for high-impact or insufficiently supported cases and should not be the sole basis for investment or regulatory decisions.
- The reported accuracy is defined over reviewed fields, so it should be interpreted together with Filled Rate and Conflict Rate rather than as standalone end-to-end correctness.

## Related Concepts

- [[concepts/cross-jurisdiction-financial-statement-localization|Cross-Jurisdiction Financial Statement Localization]]
- [[concepts/bounded-llm-verification|Bounded LLM Verification]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]
- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]: a related use of fixed semantic inventories, although FinReporting maps financial line items rather than extracting textual relations.

## Related Papers

- Han et al. (2024), "XBRL Agent": applies LLMs to analysis of XBRL-tagged financial reports.
- Wang et al. (2025), "FinTagging": benchmarks extraction and structuring of financial information with LLMs.
- Shu et al. (2025), "LAVA": develops logic-aware validation and augmentation for financial document auditing.
- Chen et al. (2021), "FinQA," and Zhu et al. (2021), "TAT-QA": evaluate numerical reasoning over financial reports.

[[index|Library home]]

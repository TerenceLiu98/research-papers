---
title: Cross-Jurisdiction Financial Statement Localization
type: concept
aliases:
  - Cross-Market Financial Reporting Localization
tags:
  - financial-reporting
  - cross-jurisdiction
  - ontology-alignment
  - accounting-taxonomies
---

## Overview

Cross-jurisdiction financial statement localization maps disclosures produced under different accounting taxonomies, filing infrastructures, and aggregation conventions into a representation familiar to users in another market. It is a semantic alignment problem rather than simple translation: equivalent line items may have different labels, superficially similar items may have different meanings, and a target schema can erase local accounting nuance.

## Key Ideas

- **Separate extraction from alignment.** Jurisdiction-specific adapters first recover facts from native sources such as XBRL or PDF tables; canonical mapping then aligns those facts to a shared income-statement, balance-sheet, and cash-flow inventory.
- **Preserve local context.** A canonical field should retain source labels, units, reporting periods, accounting standards, consolidation status, and provenance so users can inspect what the alignment abstracts away.
- **Treat ontology coverage as bounded.** A fixed ontology enables cross-market comparisons but may omit long-tail taxonomy concepts, market-specific conventions, and firm-specific disclosures. Unmappable or ambiguous items should remain visible rather than being forced into a category.
- **Make quality explicit.** Field statuses, anomaly logs, evidence pointers, and review flags distinguish valid values from missing, unparsable, inapplicable, or uncertain ones.
- **Evaluate by source regime.** XBRL-native and PDF-centric markets impose different error modes. Aggregate performance can conceal failures caused by table fragmentation, OCR noise, tagging variation, or context selection.

## Important Papers

- [[papers/finreporting-an-agentic-workflow-for-localized-reporting-of-cross-jurisdiction-financial-disclosures|FinReporting: An Agentic Workflow for Localized Reporting of Cross-Jurisdiction Financial Disclosures]]: implements canonical localization for US, Japanese, and Chinese annual filings with rule-based extraction, bounded LLM verification, and expert escalation.

## Related Concepts

- [[concepts/bounded-llm-verification|Bounded LLM Verification]]
- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]
- [[concepts/human-oversight-of-ai|Human Oversight of AI]]

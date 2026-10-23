---
title: Bounded LLM Verification
type: concept
aliases:
  - Constrained LLM Verification
tags:
  - llm-verification
  - guardrails
  - evidence-grounding
  - human-in-the-loop
---

## Overview

Bounded LLM verification uses a language model to check and selectively repair an existing structured result within an explicit decision space. The model does not generate the primary output freely: deterministic or otherwise controlled processing supplies a candidate, evidence constrains permissible changes, and unsupported cases are escalated rather than completed speculatively.

## Key Ideas

- **Restrict available actions.** A verifier can retain a candidate, make an evidence-backed repair, or request review. This makes abstention part of the protocol instead of treating every field as answerable.
- **Require grounded repairs.** Repair eligibility, cited source evidence, and consistency between the proposed value and that evidence should all be checked before an override is accepted.
- **Log decisions and failures.** Candidate values, verifier actions, evidence, anomaly flags, and failed guardrails provide an audit trail for later inspection.
- **Measure escalation as well as accuracy.** Two verifiers can achieve similar accuracy while imposing very different human-review burdens. Coverage, conflict or abstention rates, and reviewed-field accuracy describe complementary behavior.
- **Retain human authority in high-stakes settings.** Bounded verification reduces free-form generation risk but does not eliminate correlated errors, ontology omissions, or ambiguous evidence. Escalated financial, legal, medical, or regulatory cases still require domain review.

## Important Papers

- [[papers/finreporting-an-agentic-workflow-for-localized-reporting-of-cross-jurisdiction-financial-disclosures|FinReporting: An Agentic Workflow for Localized Reporting of Cross-Jurisdiction Financial Disclosures]]: constrains its verifier to `KEEP`, `REPAIR`, or `NEED_REVIEW` and accepts repairs only when filing evidence passes explicit guardrails.

## Related Concepts

- [[concepts/human-oversight-of-ai|Human Oversight of AI]]
- [[concepts/cross-jurisdiction-financial-statement-localization|Cross-Jurisdiction Financial Statement Localization]]
- [[concepts/disagreement-guided-evaluation|Disagreement-Guided Evaluation]]

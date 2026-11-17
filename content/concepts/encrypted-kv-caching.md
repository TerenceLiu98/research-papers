---
title: Encrypted KV Caching
type: concept
aliases:
  - Homomorphic KV Caching
definition: "Encrypted KV caching retains attention keys and values as ciphertexts across autoregressive decoding steps, allowing homomorphic attention to reuse prior states without revealing them to the inference server."
tags:
  - homomorphic-encryption
  - private-inference
  - llm-inference
---

## Overview

Encrypted KV caching preserves the computation savings of autoregressive attention caching while keeping intermediate keys and values encrypted. The challenge is to design ciphertext layouts that support both growing state and the two attention products efficiently.

## Key Ideas

- Key and value caches may need different layouts: query–key dot products and attention-weighted value reduction have different access patterns.
- Slot utilization, rotations, multiplicative depth, and conversion into downstream layouts determine whether caching yields useful savings.
- Append operations must insert new encrypted states without recomputing earlier tokens or repacking the whole cache.
- Smaller decoding activations change where bootstrapping is economical; cache layout and level scheduling interact.
- Encryption expands memory requirements. Efficient updates do not imply a small cache or solve long-context memory pressure.

## Important Papers

[[papers/cachemir-fully-homomorphic-encrypted-inference-of-generative-large-language-model-with-kv-cache|Cachemir]] develops complementary K/V layouts, interleaved vector–matrix multiplication, and bootstrapping scheduling for CKKS-based decoding. Its evaluation illustrates both substantial latency savings and the remaining encrypted-memory cost.

## Related Concepts

[[concepts/optimization-based-llm-serving|Optimization-Based LLM Serving]] studies growing KV state as a resource constraint. Encrypted caching adds cryptographic layout and level constraints to that broader serving problem.

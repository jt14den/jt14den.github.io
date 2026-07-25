---
title: "Letting AI agents near your infrastructure"
description: "The safe pattern for AI agents and infrastructure-as-code is read-only by default and human-approves-applies. The 2026 Terraform and Ansible MCP servers ship that way on purpose."
date: 2026-07-02
tags: [infrastructure, AI, MCP, Terraform, Ansible, IaC, DevOps]
status: draft
type: note
---

<!-- WORKING NOTE / STUB: thinking in progress, not finished. Backed by reference/wiki/infrastructure/ai-in-iac. Skeleton only; flesh out before publishing. -->

Premise: the interesting thing about the 2026 wave of AI-plus-infrastructure tooling is not that agents can write your Terraform. It's the guardrails the vendors chose to ship by default. That default is the actual best practice.

The argument, in the order I'd write it:

1. **MCP is now the interface to IaC.** In 2026 HashiCorp and Red Hat shipped official MCP servers, so an agent operates infrastructure through a governed layer instead of pasting from a chat window. The server sits between the agent and the tool and enforces existing auth, so the agent never handles credentials directly. ([Terraform MCP GA](https://www.hashicorp.com/en/blog/terraform-mcp-server-is-now-generally-available))
2. **Read-only by default is the tell.** The [Terraform MCP server](https://developer.hashicorp.com/terraform/mcp-server) ships read-only; applying against real infrastructure is gated behind an explicit flag. One environment variable separates "the agent reads my infra" from "the agent changes prod." Treat that flag as a production tripwire.
3. **Human-approves-applies.** Never let an agent cross the plan-to-apply boundary unattended in a shared or production environment. The safe loop is agent-plans, human-approves.
4. **Scan AI-written IaC like hand-written IaC.** tfsec, checkov, terrascan in CI. Agent output gets the same shift-left treatment as anything a person typed.
5. **Secrets stay in a broker.** Vault or Secrets Manager, or their MCP servers. Never in the agent's context window. ([Terraform + Vault MCP](https://www.hashicorp.com/en/blog/build-secure-ai-driven-workflows-with-new-terraform-and-vault-mcp-servers))

The good use cases right now are the read-only ones: plan review, drift detection, and "explain this change." Those add value without adding risk.

One honest caveat worth its own line: on the Ansible side, [Lightspeed](https://developers.redhat.com/products/ansible/lightspeed) and the [AAP 2.7 MCP server](https://developers.redhat.com/articles/2026/06/10/whats-new-red-hat-ansible-automation-platform-2-7) need an Ansible Automation Platform subscription, which a community playbook won't have. So the Terraform story and the Ansible story are not symmetric yet.

Open thread: what's the smallest real experiment? Probably a read-only Terraform MCP server pointed at a dev environment, no apply capability, used only for plan review and drift. Low risk, and it tests whether any of this earns its keep.

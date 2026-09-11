<script module="context">
  import { loadStripe } from "@stripe/stripe-js";
  import {
    Elements,
    LinkAuthenticationElement,
    PaymentElement,
    PaymentRequestButton,
  } from "svelte-stripe";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  import {
    PUBLIC_STRIPE_KEY,
    PUBLIC_CONNECTED_ACCOUNT_ID,
  } from "$env/static/public";

  let stripe = null;
  let clientSecret = null;
  let error = null;
  let elements;
  let processing = false;
  let selectedAmount = "500";
  let customAmount = "";
  let pid = null;

  $: amountInCents =
    selectedAmount === "custom"
      ? Math.round(Number(customAmount || 0) * 100).toString()
      : selectedAmount;

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY, {
      stripeAccount: PUBLIC_CONNECTED_ACCOUNT_ID,
    });
    clientSecret = await createPaymentIntent();
  });

  const updatePayment = async () => {
    const response = await fetch("/update-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        paymentID: pid,
        amount: amountInCents,
      }),
    });
  };

  async function createPaymentIntent() {
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInCents,
      }),
    });
    const { paymentMethodId, clientSecret } = await response.json();
    pid = paymentMethodId;
    return clientSecret;
  }

  async function submit() {
    if (processing) return;

    await updatePayment();

    processing = true;

    const result = await stripe.confirmPayment({
      elements,
      // redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/thank-you`,
      },
    });

    if (result.error) {
      error = result.error;
      processing = false;
    } else {
      goto("thank-you");
    }
  }
</script>

{#if error}
  <p class="error">{error.message} Please try again.</p>
{/if}

{#if stripe && clientSecret}
  <div id="donate">
    <Elements
      {stripe}
      {clientSecret}
      theme="night"
      labels="floating"
      bind:elements
    >
      <form on:submit|preventDefault={submit}>
        <div class="amount-picker">
          <label for="amount" class="field-label">Choose an amount</label>
          <select id="amount" bind:value={selectedAmount}>
            <option value="500">RM5</option>
            <option value="1000">RM10</option>
            <option value="1500">RM15</option>
            <option value="3000">RM30</option>
            <option value="5000">RM50</option>
            <option value="custom">Custom amount</option>
          </select>
          {#if selectedAmount === "custom"}
            <label for="custom-amount" class="field-label"
              >Custom amount (RM)</label
            >
            <input
              id="custom-amount"
              class="custom-input"
              type="number"
              min="1"
              step="0.01"
              bind:value={customAmount}
              placeholder="Enter an amount"
            />
          {/if}
        </div>

        <!-- <LinkAuthenticationElement /> -->
        <PaymentElement />

        <button
          class="donate-button"
          disabled={processing || Number(amountInCents) < 100}
        >
          {#if processing}
            Processing...
          {:else}
            Donate
          {/if}
        </button>
      </form>
    </Elements>
  </div>
{/if}

<style global>
  .amount-picker {
    @apply mb-6;
  }
  .field-label {
    @apply mb-2 block text-sm font-semibold text-slate-300;
  }
  .amount-picker select,
  .custom-input {
    @apply w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20;
  }
  .custom-input {
    @apply mt-4;
  }
  .donate-button {
    @apply mt-3 w-full rounded-xl bg-teal-400 px-4 py-3 text-base font-bold text-slate-900 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-50;
  }
</style>

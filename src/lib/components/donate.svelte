<script module="context">
  import { loadStripe } from "@stripe/stripe-js";
  import { Elements, PaymentElement, PaymentRequestButton } from "svelte-stripe";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  import { PUBLIC_STRIPE_KEY, PUBLIC_CONNECTED_ACCOUNT_ID } from "$env/static/public";

  let stripe = null;
  let clientSecret = null;
  let error = null;
  let elements;
  let processing = false;
  let selectedAmount = "500";
  let pid = null;

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY
    // , { stripeAccount: PUBLIC_CONNECTED_ACCOUNT_ID }
    );
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
        amount: selectedAmount,
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
        amount: selectedAmount,
      }),
    });
    const { clientSecret, paymentMethodId } = await response.json();
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
    <Elements {stripe} {clientSecret} theme="night" labels="floating" bind:elements>
      <form on:submit|preventDefault={submit}>
        <div class="mb-4 text-center space-x-2 space-y-2 radio-group hover:text-black">
          <label for="amount-5">
            <input type="radio" name="amount" id="amount-5" value="500" bind:group={selectedAmount} />
            RM5
          </label>

          <label for="amount-10">
            <input type="radio" name="amount" id="amount-10" value="1000" bind:group={selectedAmount} />
            RM10
          </label>

          <label for="amount-15">
            <input type="radio" name="amount" id="amount-15" value="1500" bind:group={selectedAmount} />
            RM15
          </label>

          <label for="amount-30">
            <input type="radio" name="amount" id="amount-30" value="3000" bind:group={selectedAmount} />
            RM30
          </label>

          <label for="amount-50">
            <input type="radio" name="amount" id="amount-50" value="5000" bind:group={selectedAmount} />
            RM50
          </label>
        </div>

        <PaymentElement />

        <button class=" bg-blue-500 mt-2 p-3 w-full" disabled={processing}>
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
  /* .radio-group input[type="radio"] {
    display: none;
  } */

  .radio-group label {
    display: inline-block;
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .radio-group label:hover {
    background-color: #dbeafe;
    border-color: #2563eb;
  }

  .radio-group input[type="radio"]:checked + label {
    background-color: #2563eb;
    border-color: #2563eb;
    color: #fff;
  }

  .radio-group input[type="radio"]:checked + label::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 6px;
  }
</style>

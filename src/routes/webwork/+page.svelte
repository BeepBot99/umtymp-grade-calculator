<script lang="ts">
	import { gsap } from 'gsap';
	import { Flip } from 'gsap/Flip';
	import { onMount } from 'svelte';
	import type {WebworkScore} from "$lib";
	type FlipState = Flip.FlipState;

	gsap.registerPlugin(Flip);

	onMount(() => {
		const storedWebwork = sessionStorage.getItem('webwork');
		scores = storedWebwork ? JSON.parse(storedWebwork) : [{ score: NaN, total: NaN }];
		const storedAllWebwork = sessionStorage.getItem('allWebwork');
		allWebwork = storedAllWebwork ? storedAllWebwork === 'true' : true;
		gsap.from(fieldset, {
			y: -50,
			duration: 0.5,
			ease: 'power2.out'
		});
	});

	let fieldset: HTMLFieldSetElement = $state() as HTMLFieldSetElement;

	let allWebwork = $state(true);

	function addScore() {
		scores.push({ score: NaN, total: NaN });
	}

	function removeScore(index: number) {
		scores.splice(index, 1);
	}

	let scores: WebworkScore[] = $state([]);

	$effect(() => {
		sessionStorage.setItem('allWebwork', allWebwork.toString());
		sessionStorage.setItem('webwork', JSON.stringify(scores));
	});

	let fieldsetState: FlipState;

	$effect.pre(() => {
		if (allWebwork) {
		}
		fieldsetState = Flip.getState(fieldset);
	});

    $effect(() => {
        if (allWebwork) {}
        Flip.from(fieldsetState, {
            duration: 0.25,
            spin: true
        });
    })
</script>

<fieldset
	bind:this={fieldset}
	class="fieldset bg-base-200 border-base-300 rounded-box overflow-auto border p-4 lg:max-h-110
            {allWebwork ? '' : 'min-h-4/5 lg:min-h-1/2'}"
>
	<legend class="fieldset-legend">WeBWorK</legend>

	<label class="label {allWebwork ? 'mb-2' : 'mb-4'}">
		<input type="checkbox" bind:checked={allWebwork} class="checkbox" />
		I finished all my WebWorK!
	</label>

	{#if !allWebwork}
		{#each scores as score, index}
			<div class="join">
				<input
					class="input join-item w-20"
					type="number"
					bind:value={score.score}
					placeholder="Score"
				/>
				<span class="btn btn-disabled btn-square join-item">/</span>
				<input
					class="input join-item w-20"
					type="number"
					bind:value={score.total}
					placeholder="Possible"
				/>
				{#if index < scores.length - 1}
					<button
						class="btn btn-error btn-square join-item"
						aria-label="Delete score"
						onclick={() => removeScore(index)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
							/>
						</svg>
					</button>
				{:else}
					<button
						class="btn btn-success btn-square join-item"
						onclick={addScore}
						aria-label="New score"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				{/if}
			</div>
		{/each}
	{/if}
</fieldset>

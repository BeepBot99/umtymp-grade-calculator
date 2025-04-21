<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import type { WinterSummerAssignmentScore, WrittenHomeworkScore } from '$lib';

	let scores: WrittenHomeworkScore[] = $state([]);
	let summerWinter: WinterSummerAssignmentScore = $state({
		score: NaN,
		possible: NaN,
		late: false
	});
	function addScore() {
		scores.push({ score: NaN, late: false });
	}

	function removeScore(index: number) {
		scores.splice(index, 1);
	}

	function focusNext(index: number) {
		document.getElementById(`hw-score-${index + 1}`)?.focus();
	}

	onMount(() => {
		const storedScores = sessionStorage.getItem('written');
		const storedSummerWinter = sessionStorage.getItem('summerWinter');
		scores = storedScores ? JSON.parse(storedScores) : [{ score: NaN, late: false }];
		summerWinter = storedSummerWinter
			? JSON.parse(storedSummerWinter)
			: { score: NaN, possible: NaN, late: false };
		document.getElementById('hw-score-0')?.focus();
		gsap.from(fieldset, {
			y: -50,
			duration: 0.5,
			ease: 'power2.out'
		});
	});

	let fieldset: HTMLFieldSetElement = $state() as HTMLFieldSetElement;

	$effect(() => {
		sessionStorage.setItem('written', JSON.stringify(scores));
	});

	$effect(() => {
		sessionStorage.setItem('summerWinter', JSON.stringify(summerWinter));
	});
</script>

<fieldset
	bind:this={fieldset}
	class="fieldset bg-base-200 border-base-300 rounded-box min-h-4/5 overflow-auto border p-4 lg:max-h-110 lg:min-h-1/2"
>
	<legend class="fieldset-legend">Written Homework</legend>

	<span class="mb-0.5 text-sm font-medium">Summer/Winter Assignment</span>

	<div class="join mb-4">
		<label class="floating-label join-item">
			<input
				type="number"
				placeholder="Score"
				bind:value={summerWinter.score}
				class="input input-md w-40"
			/>
			<span>Score</span>
		</label>
		<span class="btn btn-disabled join-item w-10">/</span>
		<label class="floating-label join-item">
			<input
				type="number"
				placeholder="Possible"
				bind:value={summerWinter.possible}
				class="input input-md w-40"
			/>
			<span>Possible</span>
		</label>
		<input
			type="checkbox"
			bind:checked={summerWinter.late}
			class="btn join-item"
			aria-label={summerWinter.late ? 'Late!' : 'Late?'}
		/>
	</div>
	{#each scores as score, index}
		<div class="join">
			<input
				type="number"
				id="hw-score-{index}"
				min="0"
				onkeydown={async (e) => {
					if (e.key === 'Enter') {
						if (index === scores.length - 1) {
							addScore();
						}
						await tick();
						focusNext(index);
					}
				}}
				bind:value={score.score}
				class="input input-md join-item"
				placeholder="Score"
			/>
			<input
				type="checkbox"
				bind:checked={score.late}
				class="btn join-item"
				aria-label="It's late"
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
</fieldset>

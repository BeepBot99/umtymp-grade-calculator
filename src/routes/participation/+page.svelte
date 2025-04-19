<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import type {ParticipationData} from "$lib";

	let fieldset: HTMLFieldSetElement = $state() as HTMLFieldSetElement;

	let participation: ParticipationData = $state({
		tdqs: NaN,
		totalTdqs: NaN,
		participationGrade: 90
	});

	onMount(() => {
		const storedParticipation = sessionStorage.getItem('participation');
		if (storedParticipation) {
			participation = JSON.parse(storedParticipation);
		}
		gsap.from(fieldset, {
			y: -50,
			duration: 0.5,
			ease: 'power2.out'
		});
	});

	$effect(() => {
		sessionStorage.setItem('participation', JSON.stringify(participation));
	})
</script>

<fieldset
	bind:this={fieldset}
	class="fieldset bg-base-200 border-base-300 rounded-box overflow-auto border p-4"
>
	<legend class="fieldset-legend">Participation</legend>

	<div class="join">
		<label class="floating-label join-item">
			<input
				type="number"
				placeholder="TDQs Completed"
				bind:value={participation.tdqs}
				class="input input-md w-40"
			/>
			<span>TDQs Completed</span>
		</label>
		<span class="btn btn-disabled join-item w-10">/</span>
		<label class="floating-label join-item">
			<input
				type="number"
				placeholder="Total TDQs"
				bind:value={participation.totalTdqs}
				class="input input-md w-40"
			/>
			<span>Total TDQs</span>
		</label>
	</div>

	<label class="floating-label mt-8">
		<input
			type="number"
			placeholder="Participation Grade"
			bind:value={participation.participationGrade}
			class="input input-md w-full"
		/>
		<span>Participation Grade</span>
	</label>
</fieldset>

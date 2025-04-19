<script lang="ts">
    import {page} from "$app/state";

    const pages = ["written", "webwork", "exams", "participation", "results"]
        .map(url => `/${url}`);

    let previousPage = $derived(pages[pages.indexOf(page.url.pathname) - 1]);

    let nextPage = $derived(pages[pages.indexOf(page.url.pathname) + 1]);
</script>

<div class="mb-16">
    <div class="join mb-16">
        <a href={previousPage} class:btn-disabled={page.url.pathname === pages[0]}
           class="join-item btn btn-secondary w-35" type="button">
            Previous
        </a>
        <a href={nextPage} class:btn-disabled={page.url.pathname === pages.at(-1)} class="join-item btn btn-primary w-35"
           type="button">Next</a>
    </div>
    <a href="/" data-sveltekit-reload onclick={() => sessionStorage.clear()} class="btn btn-error w-15">Restart</a>
</div>

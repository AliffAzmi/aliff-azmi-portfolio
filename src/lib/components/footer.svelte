<script>
	import Icon from '@iconify/svelte';
</script>

<footer class="p-10 grid gap-y-10 gap-x-4">
	<div>
		<div class="flex gap-4 justify-center">
			<a href="https://github.com/AliffAzmi" target="_blank">
				<Icon class="w-6 h-6 hover:text-teal-400" icon="akar-icons:github-fill" />
			</a>
			<a href="https://www.linkedin.com/in/aliff-azmi-link" target="_blank">
				<Icon class="w-6 h-6 hover:text-teal-400" icon="akar-icons:linkedin-box-fill" />
			</a>
			<a href="https://www.youtube.com/channel/UCauBLoR5-8sJSGt_EgkxS5A" target="_blank">
				<Icon class="w-6 h-6 hover:text-teal-400" icon="akar-icons:youtube-fill" />
			</a>
		</div>
	</div>
	<div class="m-auto text-center">
		<p>Copyright © {`${new Date().getFullYear()}`} - All right reserved by Aliff Azmi</p>
	</div>
</footer>

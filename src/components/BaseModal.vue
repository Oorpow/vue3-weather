<template>
	<Teleport to="body">
		<Transition name="modal-outer">
			<div
				v-show="modalActive"
				class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
			>
				<Transition name="modal-inner">
					<div
						v-if="modalActive"
						class="p-4 bg-white self-start mt-32 max-w-screen-md rounded"
					>
						<slot />
						<button
							class="mt-2 bg-weather-primary text-white py-2 px-6"
							@click="emits('toggle-modal')"
						>
							Close
						</button>
					</div>
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		modalActive: boolean
	}>(),
	{
		modalActive: false,
	}
)

const emits = defineEmits(['toggle-modal'])
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
	transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.355, 1);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
	opacity: 0;
}

.modal-inner-enter-active {
	transition: all 0.2s cubic-bezier(0.52, 0.02, 0.355, 1) 0.15s;
}
.modal-inner-leave-active {
	transition: all 0.2s cubic-bezier(0.52, 0.02, 0.355, 1);
}

.modal-inner-enter-from {
	opacity: 0;
	transform: scale(0.8);
}
.modal-inner-leave-to {
	transform: scale(0.8);
}
</style>

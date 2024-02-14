import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';

import AppUserService from './app-user.service';
import { type IAppUser } from '@/shared/model/app-user.model';
import { useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AppUser',
  setup() {
    const dateFormat = useDateFormat();
    const appUserService = inject('appUserService', () => new AppUserService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const appUsers: Ref<IAppUser[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveAppUsers = async () => {
      isFetching.value = true;
      try {
        const res = await appUserService().retrieve();
        appUsers.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveAppUsers();
    };

    onMounted(async () => {
      await retrieveAppUsers();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IAppUser) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeAppUser = async () => {
      try {
        await appUserService().delete(removeId.value);
        const message = 'A AppUser is deleted with identifier ' + removeId.value;
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveAppUsers();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      appUsers,
      handleSyncList,
      isFetching,
      retrieveAppUsers,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeAppUser,
    };
  },
});

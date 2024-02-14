import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import AppUserService from './app-user.service';
import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { type IAppUser, AppUser } from '@/shared/model/app-user.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AppUserUpdate',
  setup() {
    const appUserService = inject('appUserService', () => new AppUserService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const appUser: Ref<IAppUser> = ref(new AppUser());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveAppUser = async appUserId => {
      try {
        const res = await appUserService().find(appUserId);
        res.bdate = new Date(res.bdate);
        appUser.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.appUserId) {
      retrieveAppUser(route.params.appUserId);
    }

    const validations = useValidation();
    const validationRules = {
      userId: {},
      name: {},
      bdate: {},
    };
    const v$ = useVuelidate(validationRules, appUser as any);
    v$.value.$validate();

    return {
      appUserService,
      alertService,
      appUser,
      previousState,
      isSaving,
      currentLanguage,
      v$,
      ...useDateFormat({ entityRef: appUser }),
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.appUser.id) {
        this.appUserService()
          .update(this.appUser)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo('A AppUser is updated with identifier ' + param.id);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.appUserService()
          .create(this.appUser)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess('A AppUser is created with identifier ' + param.id);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});

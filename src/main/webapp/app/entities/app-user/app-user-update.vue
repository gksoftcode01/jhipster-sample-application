<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="jhipsterSampleApplicationApp.appUser.home.createOrEditLabel" data-cy="AppUserCreateUpdateHeading">
          Create or edit a App User
        </h2>
        <div>
          <div class="form-group" v-if="appUser.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="appUser.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="app-user-userId">User Id</label>
            <input
              type="text"
              class="form-control"
              name="userId"
              id="app-user-userId"
              data-cy="userId"
              :class="{ valid: !v$.userId.$invalid, invalid: v$.userId.$invalid }"
              v-model="v$.userId.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="app-user-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="app-user-name"
              data-cy="name"
              :class="{ valid: !v$.name.$invalid, invalid: v$.name.$invalid }"
              v-model="v$.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="app-user-bdate">Bdate</label>
            <div class="d-flex">
              <input
                id="app-user-bdate"
                data-cy="bdate"
                type="datetime-local"
                class="form-control"
                name="bdate"
                :class="{ valid: !v$.bdate.$invalid, invalid: v$.bdate.$invalid }"
                :value="convertDateTimeFromServer(v$.bdate.$model)"
                @change="updateInstantField('bdate', $event)"
              />
            </div>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./app-user-update.component.ts"></script>

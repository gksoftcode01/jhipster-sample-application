<template>
  <div>
    <h2 id="page-heading" data-cy="AppUserHeading">
      <span id="app-user-heading">App Users</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh list</span>
        </button>
        <router-link :to="{ name: 'AppUserCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-app-user"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span>Create a new App User</span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && appUsers && appUsers.length === 0">
      <span>No App Users found</span>
    </div>
    <div class="table-responsive" v-if="appUsers && appUsers.length > 0">
      <table class="table table-striped" aria-describedby="appUsers">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>User Id</span></th>
            <th scope="row"><span>Name</span></th>
            <th scope="row"><span>Bdate</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appUser in appUsers" :key="appUser.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'AppUserView', params: { appUserId: appUser.id } }">{{ appUser.id }}</router-link>
            </td>
            <td>{{ appUser.userId }}</td>
            <td>{{ appUser.name }}</td>
            <td>{{ formatDateShort(appUser.bdate) || '' }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'AppUserView', params: { appUserId: appUser.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'AppUserEdit', params: { appUserId: appUser.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(appUser)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span id="jhipsterSampleApplicationApp.appUser.delete.question" data-cy="appUserDeleteDialogHeading">Confirm delete operation</span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-appUser-heading">Are you sure you want to delete App User {{ removeId }}?</p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-appUser"
            data-cy="entityConfirmDeleteButton"
            v-on:click="removeAppUser()"
          >
            Delete
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./app-user.component.ts"></script>

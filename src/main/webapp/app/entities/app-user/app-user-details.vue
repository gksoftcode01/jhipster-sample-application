<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="appUser">
        <h2 class="jh-entity-heading" data-cy="appUserDetailsHeading"><span>App User</span> {{ appUser.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>User Id</span>
          </dt>
          <dd>
            <span>{{ appUser.userId }}</span>
          </dd>
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ appUser.name }}</span>
          </dd>
          <dt>
            <span>Bdate</span>
          </dt>
          <dd>
            <span v-if="appUser.bdate">{{ formatDateLong(appUser.bdate) }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span>Back</span>
        </button>
        <router-link v-if="appUser.id" :to="{ name: 'AppUserEdit', params: { appUserId: appUser.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span>Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./app-user-details.component.ts"></script>

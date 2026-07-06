import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Role } from "../types";
import { getRoles } from "../../service/roleService";

interface FetchRolesState{
    client:{
        roles:Role[];
    }
}

export const fetchRoles = createAsyncThunk<Role[], void, {state : FetchRolesState}>(
    'client/fetchRoles', async (_, {getState}) => {
        const {roles} = getState().client
        if (roles.length > 0) {
            return roles
        }
        return getRoles()
    }
)
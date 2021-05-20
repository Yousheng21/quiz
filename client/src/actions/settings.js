import axios from "axios";
// import 'rsuite/dist/styles/rsuite-default.min.css';
// import { Alert } from 'rsuite';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import {API_URL} from "../config";


export const edit = async (email,oldPassword,newPassword) =>{
        try {
            const response = await axios.post(`${API_URL}/auth/edit`,{
                email,
                oldPassword,
                newPassword
            })
            await Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Профиль успешно обновлен',
                showConfirmButton: false,
                timer: 1500
            })
            // Alert.success('Профиль успешно обновлен',3000);
            setTimeout(()=>document.location.reload(true),1000);

            // dispatch(setUser(response.data.user));
            // localStorage.setItem('token',response.data.token);//локальное хранилище

            console.log(response.data);
        } catch (e) {
            await Swal.fire({
                position: 'top-start',
                icon: 'error',
                title: e.response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
            // Alert.error(e.response.data.message,3000);

            // alert(e.response.data.errors.errors[0].msg);

        }

}
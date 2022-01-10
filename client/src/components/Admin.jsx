import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';

function Admin () {
  const [users, set_users] = useState(null);
  const [user_data, set_user_data] = useState(null);
  const [is_open, set_is_open] = useState(false);
  const close_modal = () => set_is_open(false);
  const open_modal = (fetched_user) => {
    set_is_open(true);
    set_user_data(fetched_user);

  };


  async function fetch_users () {
    const response = await fetch('/users', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    if (!users) {
      fetch_users().then((data) => set_users(data));
    }
  });

  const render_users = () => {
    if (users instanceof Object) {
      const user_list = users.map((user) => {
        return (
          <div key={user.id} className="py-4 flex flex-row justify-between items-center">
            <span className="text-lg font-semibold">{user.name}</span>
            <div className="float-right">
              <button className="bg-black hover:bg-gray-900 admin-btns mr-2" onClick={() => open_modal(user)}>View Profile</button>
              <button className="bg-red-800 hover:bg-red-900 admin-btns" onClick={() => handle_delete(user)}>Delete</button>
            </div>
          </div>
        );
      });
      return user_list;
    }
    return null;
  };

  const handle_delete = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {

        const response = await fetch('/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            'id': user.id,
          }),
        });
        const data = await response.json();

        if (response.status >= 400) {
          Swal.fire({
            title: 'ERROR',
            text: data.message,
            icon: 'error',
          });

        } else {
          Swal.fire({
            title: 'Deleted!',
            text: data.message,
            icon: 'success',
          });
          set_users(data.users);
        }

      }
    });
  };

  return (
    <div>
      <main className="profile-container sm:w-11/12 xl:w-full">
        <h1 className="section-header mt-10">Users</h1>
        <div className="mt-4 text-gray-700 divide-y-2 divide-gray-100">
          {render_users()}
        </div>
      </main>
      <Transition appear show={is_open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={close_modal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
                            &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-slate-100 shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="flex-justify-center flex-col items-center my-4">
                    <img className="rounded-full my-4" width="200" height="200" src="https://source.unsplash.com/random/200x200?puppy" alt="profile picture" />
                    <h4 className="text-gray-500 text-base">@{user_data ? user_data.username : null}</h4>
                    <h1 className="font-black text-xl">{user_data ? user_data.name : null}</h1>
                    <h1 className="text-gray-500 text-base mb-4">{user_data ? user_data.bio : null}</h1>
                  </div>
                </Dialog.Title>
                <div className="flex flex-col items-start justify-between">
                  <h1 className="px-2 py-2 border-b-4 font-bold text-xl w-full text-left">About</h1>
                  <p className="px-2 py-2">{user_data ? user_data.about_me : 'No information provided.'}</p>
                </div>
                <div className="flex flex-col items-start justify-between">
                  <h1 className="px-2 py-2 border-b-4 font-bold text-xl w-full text-left">Favorites</h1>
                  <p className="px-2 py-2">{user_data ? user_data.favorites : 'No information provided.'}</p>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>

  );
}

export default Admin;
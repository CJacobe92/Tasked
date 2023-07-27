const baseURL = "http://localhost:3000/api/v1"
// const baseURL = "https://plannerapi.onrender.com/api/v1"

export const fetchRegister = async (requestBody) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }

    const request = await fetch(`${baseURL}/users`, requestOptions)

    const response = {
        uid: request.headers.get('Uid'),
        auth: request.headers.get('Authorization')
    }

    return response
}


export const fetchLogin = async (requestBody) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }

    const request = await fetch(`${baseURL}/auth`, requestOptions)

    const response = {
        uid: request.headers.get('Uid'),
        auth: request.headers.get('Authorization')
    }

    return response
}

export const FetchUserData = async (uid, auth) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${auth}`
        }
      }

      const request = await fetch(`${baseURL}/users/${uid}`, requestOptions);

      if (!request.ok) {
        throw new Error('Failed to fetch user data');
      }

      const response = await request.json();
      return response.data;
    } catch (error) {
      // Handle the error here (e.g., log it, show a notification, etc.)
      console.error('Error fetching user data:', error.message);
      return null; // Return null or an empty object/array to indicate failure
    }
  }




export const FetchCreateTask = async (uid, auth, category_id, requestBody) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${auth}`
    },
    body: JSON.stringify({"task": requestBody})
  }

  await fetch(`${baseURL}/users/${uid}/categories/${category_id}/tasks`, requestOptions);

}

  export const FetchEditTask = async (uid, auth, category_id, task_id, requestBody) => {
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${auth}`
        },
        body: JSON.stringify({"task": requestBody})
      }

      const request = await fetch(`${baseURL}/users/${uid}/categories/${category_id}/tasks/${task_id}`, requestOptions);

      console.log(request)
  }

  export const FetchDiscardTask = async (uid, auth, category_id, task_id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${auth}`
      }
    }

    await fetch(`${baseURL}/users/${uid}/categories/${category_id}/tasks/${task_id}`, requestOptions);
}

export const FetchDeleteCategory = async (uid, auth, category_id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${auth}`
    }
  }

  await fetch(`${baseURL}/users/${uid}/categories/${category_id}`, requestOptions);
}

export const FetchEditCategory = async (uid, auth, category_id, requestBody) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${auth}`
    },
    body: JSON.stringify({"category": requestBody})
  }

  const request = await fetch(`${baseURL}/users/${uid}/categories/${category_id}`, requestOptions);

  console.log(request)
}

export const FetchCreateCategory = async (uid, auth, requestBody) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${auth}`
    },
    body: JSON.stringify({"category": requestBody})
  }

  const request = await fetch(`${baseURL}/users/${uid}/categories`, requestOptions);

  const response = await request.json()

  const category = {
    id: response.data.id,
    name: response.data.name
  }

  return category
}

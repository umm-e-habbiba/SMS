import React, { useState, useEffect } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CButton,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { API_URL } from '../../store'
import { useForm } from 'react-hook-form'
import moment from 'moment'
const AllUser = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [loader, setLoader] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [allUsers, setallUsers] = useState([])
  const [userId, setUserId] = useState('')
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [addModal, setAddModal] = useState(false)
  const [groupNames, setGroupNames] = useState([])
  const [groupName, setGroupName] = useState('')
  const [showFilteredResult, setShowFilteredResult] = useState(false)
  const [filteredUser, setFilteredUser] = useState([])
  useEffect(() => {
    const getToken = localStorage.getItem('token')
    if (getToken) {
      getAllUsers()
      getAllGroupNames()
      setToken(getToken)
    } else {
      navigate('/login')
    }
  }, [])
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '',
      status: '',
    },
  })
  const getAllUsers = () => {
    setLoader(true)
    const myHeaders = new Headers()
    myHeaders.append('Authorization', token)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch(API_URL + 'users', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.success) {
          setallUsers(result.Users)
          setLoader(false)
        }
      })
      .catch((error) => console.error(error))
  }
  const getAllGroupNames = () => {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', token)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    fetch(API_URL + 'all-groupnames', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.status == 'success') {
          // setallUsers(result.Users?.filter((user) => user.status == 'Failed'))
          setGroupNames(result.uniqueGroupNames)
        }
      })
      .catch((error) => console.error(error))
  }
  const getFilteredUsers = (value) => {
    // console.log('step', filterUsmle, 'category', filterCategory)
    let filtered_result = []
    filtered_result = allUsers.filter((user) => user.groupName == value)
    setShowFilteredResult(true)
    setFilteredUser(filtered_result)
  }
  return (
    <DefaultLayout>
      <CCard className="mb-3">
        <CCardHeader className="flex justify-between items-center bg-[#323a49] text-white">
          <span className="font-bold">All Users ({allUsers.length})</span>
          <div className="flex justify-start items-center ">
            <span className="font-bold">Select your desired list: </span>
            <CFormSelect
              aria-label="Default select example"
              value={groupName}
              onChange={(e) => {
                getFilteredUsers(e.target.value, allUsers)
                setGroupName(e.target.value)
              }}
              className="ml-3 w-52 font-bold"
            >
              <option value="">Select List name</option>
              {groupNames && groupNames.length > 0
                ? groupNames.map((name, index) => (
                    <option value={name} key={index}>
                      {name}
                    </option>
                  ))
                : ''}
            </CFormSelect>
          </div>
        </CCardHeader>
        <CCardBody>
          {loader ? (
            <center className="mt-4">
              <CSpinner color="primary" variant="grow" />
            </center>
          ) : (
            <>
              {groupName && (
                <h1 className="text-center font-bold uppercase underline mb-3">{groupName}</h1>
              )}
              <CTable striped responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" className="text-center">
                      #
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      First name
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      Last name
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      Phone Number
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      Messages Sent
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      Last Message
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allUsers && allUsers.length > 0 ? (
                    showFilteredResult ? (
                      filteredUser && filteredUser.length > 0 ? (
                        filteredUser
                          .sort((a, b) => {
                            return new Date(b.date).getTime() - new Date(a.date).getTime()
                          })
                          .map((user, i) => (
                            <CTableRow key={i}>
                              <CTableDataCell scope="row" className="text-center align-middle">
                                {i + 1}
                              </CTableDataCell>
                              <CTableDataCell className="text-center align-middle">
                                {user.firstName}
                              </CTableDataCell>
                              <CTableDataCell className="text-center align-middle">
                                {user.lastName}
                              </CTableDataCell>
                              <CTableDataCell className="text-center align-middle">
                                {user.phoneHome}
                              </CTableDataCell>
                              <CTableDataCell className="text-center align-middle w-auto">
                                {user.numberOfMessages}
                              </CTableDataCell>
                              <CTableDataCell className="text-center align-middle w-auto">
                                {user.lastMessagedAt
                                  ? moment(user.lastMessagedAt).format('Do MMMM YYYY')
                                  : 'Null'}
                              </CTableDataCell>
                            </CTableRow>
                          ))
                      ) : (
                        <CTableRow>
                          <CTableDataCell colSpan={14} className="text-center">
                            Kindly select a list
                          </CTableDataCell>
                        </CTableRow>
                      )
                    ) : (
                      allUsers
                        .sort((a, b) => {
                          return new Date(b.date).getTime() - new Date(a.date).getTime()
                        })
                        .map((user, i) => (
                          <CTableRow key={i}>
                            <CTableDataCell scope="row" className="text-center align-middle">
                              {i + 1}
                            </CTableDataCell>
                            <CTableDataCell className="text-center align-middle">
                              {user.firstName}
                            </CTableDataCell>
                            <CTableDataCell className="text-center align-middle">
                              {user.lastName}
                            </CTableDataCell>
                            <CTableDataCell className="text-center align-middle">
                              {user.phoneHome}
                            </CTableDataCell>
                            <CTableDataCell className="text-center align-middle w-auto">
                              {user.numberOfMessages}
                            </CTableDataCell>
                            <CTableDataCell className="text-center align-middle w-auto">
                              {user.lastMessagedAt
                                ? moment(user.lastMessagedAt).format('Do MMMM YYYY')
                                : 'Null'}
                            </CTableDataCell>
                          </CTableRow>
                        ))
                    )
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={14} className="text-center">
                        No Users Found
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </>
          )}
        </CCardBody>
      </CCard>
    </DefaultLayout>
  )
}
export default AllUser

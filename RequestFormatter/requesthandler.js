import store from '../reduxhelper/store';
import * as Global from '../Helper/Constants';
import * as actions from '../reduxhelper/actions';

export const createAppointmentReq = () => {
    let storeInfo = store.getState()
    let test_detail = storeInfo.testInfo[0];
    console.log('***************')
    console.log(storeInfo)
    console.log(Global.editAppntId)
    let reqParam = {'time_slot': test_detail.timeSlot, 'date_slot': test_detail.dateSlot, 'address': test_detail.address, 'slotID': test_detail.slotId, 'appointment_id': test_detail.appointment_id}
    let appointmentInfo = storeInfo.testInfo.map(test => ({
        
            'medical_center': test.testDetail.center_id, 
            'test_type': test.testDetail.test_type, 
            'package': test.testDetail.test_type == 1 ? test.testDetail.test_id : null, 
            'labtest': test.testDetail.test_type == 0 ? test.testDetail.test_id : null,
            'patients': test.testDetail.testFor.map(fam => ({
                    'phone': fam.mobNum
            }))
        
    }))
    reqParam = {...reqParam, 'appointment': appointmentInfo}
    console.log(reqParam)
    return reqParam
}

export const prepareStoreEditAppointment = (item) => {
        console.log('test info list');
        let testList = item.appointment.map(testInfo => ({
                appointment_id: item.appointment_id,
                timeSlot: item.time_slot,
                dateSlot: item.date_slot,
                slotId: item.slotID,
                address: item.address_detail.id,
                test_name: testInfo.test_type == 0 ? testInfo.labtest_detail.name : testInfo.package_detail.name, 
                test_id: testInfo.test_type == 0 ? testInfo.labtest_detail.id : testInfo.package_detail.id, 
                center_id: testInfo.medicalcenter_detail.id, 
                center_name: testInfo.medicalcenter_detail.name, 
                price: testInfo.test_type == 0 ? testInfo.labtest_detail.price : testInfo.package_detail.price, 
                count: 1, 
                family: testInfo.appnt_detail.map(fam => ({name: fam.user_detail.name, mobNum: fam.user_detail.phone})),
                test_type: testInfo.test_type
        }));
        // console.log(testList); 
        for (let testInfo of testList){
                console.log('-------------------')
                console.log(testInfo)
                store.dispatch(actions.testAdded(testInfo))
        }

}


import { Block, View, Text, Form, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './green.scss'
//logs.js
const app = Taro.getApp()

@withWeapp({
  data: {
    mobile: '',
    citiApplications: []
  },
  onLoad: function() {
    this.setData({
      mobile: '',
      citiApplications: JSON.parse(
        Taro.getStorageSync('citi-applications') || JSON.stringify([])
      )
    })
    console.log('this = ', this.data.citiApplications)
  },
  inputMobile: function(e) {
    this.setData({ mobile: e.detail.value })
  },
  apply: function() {
    if (!this.data.mobile) {
      Taro.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 2000
      })

      return
    }

    const self = this

    Taro.showModal({
      title: '一键申请花旗信息卡',
      content:
        '如果您点击确定，即使用您在本应用中的信息自动为您申请一张花旗信息卡。',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#666',
      confirmColor: '#060',
      confirmText: '确定',
      success: ({ confirm, cancel }) => {
        if (confirm) {
          Taro.showLoading({ title: '申请中……' })
          Taro.request({
            method: 'POST',
            url: app.d.uniheart + '/citi-dev/onboarding/apply',
            header: {
              accept: 'application/json'
            },
            data: {
              product: {
                creditCardProduct: {
                  productCode: 'VC830',
                  sourceCode: 'WW5ARCE1',
                  organization: '888',
                  logo: '830',
                  requestCreditShield: 'false',
                  embossName: 'Matthew Hyden',
                  billingAddress: 'OFFICE_ADDRESS',
                  cardDeliveryAddress: 'OFFICE_ADDRESS',
                  pinDeliveryAddress: 'OFFICE_ADDRESS',
                  giftCode: 'gc123',
                  creditLimitIncreaseIndicator: true
                }
              },
              applicant: {
                ocr: {
                  ocrReferenceNumber: 'OCR456789434538922'
                },
                motherMaidenName: 'Lisa',
                name: {
                  salutation: 'MR',
                  givenName: 'Matthew',
                  middleName: 'Du',
                  surname: 'Hayden',
                  localEnglishGivenName: 'Matthew',
                  localEnglishSurname: 'Hayden',
                  aliasName: 'Matt',
                  saluteBy: 'SURNAME'
                },
                demographics: {
                  gender: 'MALE',
                  dateOfBirth: '1972-09-15',
                  placeOfBirth: 'Sydney',
                  countryOfBirth: 'SG',
                  nationality: 'SG',
                  domicileCountryCode: 'SG',
                  permanentResidencyCountryCode: 'SG',
                  maritalStatus: 'MARRIED',
                  residencyStatus: 'OWN_HOUSE',
                  residenceType: 'BUNGALOW',
                  taxDomicileCountryCode: 'SG',
                  spokenLanguageCode: 'ENGLISH',
                  correspondenceLanguageCode: 'ENGLISH'
                },
                address: [
                  {
                    addressType: 'OFFICE_ADDRESS',
                    addressLine1: '40A Orchard Road',
                    addressLine2: '#99-99 Macdonald House',
                    addressLine3: 'Orchard Avenue 2',
                    addressLine4: 'Street 65',
                    cityName: 'Singapore',
                    state: 'AM',
                    postalCode: '345346',
                    provinceCode: 'Singapore',
                    countryCode: 'SG',
                    okToMail: true,
                    residenceDurationInYears: 5,
                    residenceDurationInMonths: 4,
                    countrySpecificAddress: {
                      unitNumber: '99',
                      floorNumber: '18',
                      blockNumber: '19',
                      buildingName: 'Estella',
                      estateName: 'Marine Parade',
                      streetNumber: '52',
                      streetName: 'Marine Parade',
                      town: 'SG'
                    }
                  }
                ],
                email: [
                  {
                    emailAddress: 'matt.hayden@gmail.com',
                    okToEmail: true,
                    isPreferredEmailAddress: true
                  }
                ],
                phone: [
                  {
                    phoneType: 'HOME_PHONE_NUMBER',
                    phoneCountryCode: '65',
                    areaCode: '0',
                    phoneNumber: self.data.mobile,
                    okToSms: true,
                    okToCall: true
                  }
                ],
                contactPreference: {
                  sendSmsAdviceFlag: true,
                  sendEmailAdviceFlag: true,
                  preferredMailingAddress: 'HOME_ADDRESS',
                  eStatementEnrollmentFlag: true
                },
                contactConsent: {
                  okToCall: true,
                  okToMail: true,
                  okToSms: true
                },
                financialInformation: {
                  hasForeseeableFinancialChanges: true,
                  expenseDetails: [
                    {
                      expenseType: 'RENT_PAID',
                      expenseAmount: 590.25,
                      frequency: 'MONTHLY'
                    }
                  ],
                  incomeDetails: [
                    {
                      incomeType: 'DECLARED_FIXED',
                      fixedAmount: 7590.25,
                      variableAmount: 1590.25,
                      frequency: 'MONTHLY',
                      otherIncomeDescription: 'Rent'
                    }
                  ],
                  existingLoanDetails: [
                    {
                      monthlyInstallmentAmount: 250.25,
                      outstandingBalanceAmount: 5000.25
                    }
                  ]
                },
                education: {
                  highestEducationLevel: 'MASTER',
                  yearOfGraduation: '2003',
                  studentId: 'STID234567',
                  university: 'NUS'
                },
                employmentDetails: [
                  {
                    employerName: 'Citi Bank',
                    jobTitle: 'POLITICIAN',
                    occupationCode: 'ADMIN_SUPPORT_CLERICAL',
                    industryCode: 'ENVIRONMENTAL_CONTROLS',
                    employmentDurationInYears: 5,
                    employmentDurationInMonths: 3,
                    employmentStatus: 'EMPLOYED',
                    monthsInPreviousEmployment: 5,
                    yearsInPreviousEmployment: 4,
                    accountantName: 'Javier',
                    accountantFirmName: 'ACME',
                    yearsInIndustry: 5,
                    monthsInIndustry: 6
                  }
                ],
                identificationDocumentDetails: [
                  {
                    idType: 'PASSPORT',
                    idNumber: 'S42258011',
                    idExpiryDate: '2027-04-11',
                    idIssueDate: '2017-04-12',
                    idIssuePlace: 'SG',
                    idIssueState: 'AM',
                    idIssueCountry: 'SG',
                    isPrimaryId: true
                  }
                ],
                additionalData: {
                  numberOfDependents: '3',
                  staffIndicator: true,
                  businessNature: 'TRAVEL_AGENCIES',
                  emergencyContactName: 'Pearline',
                  emergencyContactPhoneNumber: '6164042321',
                  overLimitConsentFlag: true,
                  countrySpecificGroup: {
                    bumiputraIndicator: true,
                    disabilityIndicator: true,
                    unionPayCardNumber: '5555666600008888',
                    taxFileNumber: '656456737'
                  },
                  referralGivenName: 'Maxwell',
                  referralSurname: 'Gate'
                },
                partnerCustomerDetails: {
                  partnerCustomerInternalId: 'ZOW9IO793855',
                  partnerCustomerId: 'P011100000125'
                },
                consentDetails: [
                  {
                    consentType: 'PDP_CONSENT',
                    isConsentGiven: true
                  },
                  {
                    consentType: 'PARTNER_CONSENT',
                    isConsentGiven: true
                  }
                ],
                selfDeclaration: {
                  totalActiveCreditCardLimitAmount: 23000.25,
                  anticipatedIncomeDecreaseCode: 'Yes',
                  loanTakenIndicator: true,
                  monthlyRepaymentForAllExtLoans: 5000.25
                },
                kycInformation: {
                  selfPublicFigureDeclarationFlag: true,
                  publicFigureOfficeStatus: 'Active',
                  publicFigureOfficeDetails:
                    'Department of education and training',
                  publicFigureOfficeStartDate: '2017-04-12',
                  publicFigureOfficeEndDate: '2020-04-11',
                  isRelatedToSeniorPublicFigure: true,
                  relatedSeniorPublicFigureName: 'Dan Lee',
                  relatedSpfCountryOfGovernment: 'SG',
                  relatedSeniorPublicFigureDepartment: 'Ministry',
                  relationshipWithSeniorPublicFigure: 'Father',
                  relatedSeniorPublicFigureLastName: 'Lee',
                  usTaxStatus: 'EXCEPTED_NFFE',
                  usTaxId: 'US234567'
                }
              }
            },
            success(res) {
              console.log('res = ', res.data)
              if (
                res.errMsg === 'request:ok' &&
                res.statusCode >= 200 &&
                res.statusCode < 300
              ) {
                const citiApplications = JSON.parse(
                  Taro.getStorageSync('citi-applications') || JSON.stringify([])
                )

                Taro.setStorageSync(
                  'citi-applications',
                  JSON.stringify([...citiApplications, res.data])
                )

                Taro.showModal({
                  title: '申请成功',
                  content: `当前状态：${res.data.applicationStage}；申请编号：${res.data.applicationId}。请您保持手机号畅通，我们的客户经理将会给您回电。`,
                  showCancel: false,
                  confirmColor: '#060',
                  confirmText: '知道了'
                })
              } else {
                Taro.showToast({
                  title: `申请失败：${res.errMsg}`,
                  duration: 3000,
                  mask: true,
                  icon: 'none'
                })
              }
            },
            fail(err) {
              Taro.showToast({
                title: `申请失败：${JSON.stringify(err)}`,
                duration: 3000,
                mask: true,
                icon: 'none'
              })
            },
            complete() {
              Taro.hideLoading()
            }
          })
        }

        if (cancel) {
          console.log('您取消了申请')
        }
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '绿色通道'
  }

  render() {
    const { citiApplications } = this.data
    return (
      <View className="container-green">
        {citiApplications.length > 0 && (
          <View>
            <View className="header">
              <Text>您已申请花旗信用卡：</Text>
            </View>
            {citiApplications.map((item, index) => {
              return (
                <View className="page-section">
                  <View>
                    <Text>{'申请编号：' + item.applicationId}</Text>
                  </View>
                  <View>
                    <Text>{'当前状态：' + item.applicationStage}</Text>
                  </View>
                  <View className="tip">
                    <Text>
                      请您保持手机号畅通，我们的客户经理将会给您回电。
                    </Text>
                  </View>
                </View>
              )
            })}
          </View>
        )}
        {citiApplications.length <= 0 && (
          <View>
            <View className="page-section">
              <Text>填写手机号，一键申请花旗信用卡</Text>
            </View>
            <Form onSubmit={this.apply} onReset={this.formReset}>
              <View className="page-section">
                <View className="weui-cells weui-cells_after-title">
                  <View className="weui-cell weui-cell_input">
                    <Input
                      className="weui-input"
                      autoFocus
                      placeholder="手机号"
                      maxlength="11"
                      onInput={this.inputMobile}
                    ></Input>
                  </View>
                </View>
              </View>
              <Button type="primary" formType="submit">
                一键申请
              </Button>
            </Form>
          </View>
        )}
      </View>
    )
  }
}

export default _C

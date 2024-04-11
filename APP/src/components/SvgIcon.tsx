// SYNTAX
// 
// import SvgIcon from './SvgIcon'
// 
// <SvgIcon id={} />

// burger, close, account, notifications, messages, logout
// musician, studio, band, stage, store, upload-image, add
// search

export default function SvgIcon(props: any) {

    const color = '#000000'

    return (

        <>

            {props?.id === 'search' &&

                <svg
                    width={props?.width || '24'}
                    height={props?.height || '24'}
                    viewBox="0 -960 960 960"
                    onClick={props?.onClick}
                >
                    <path fill={props?.color || color}  d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
            }


            {props?.id === 'add' &&
                <svg
                    width={props?.width || '30'}
                    height={props?.height || '30'}
                    onClick={props?.onClick}
                    viewBox="0 -960 960 960">
                    <path fill={props?.color || color} d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
                </svg>
            }

            {props?.id === 'upload-image' &&

                <svg
                    width={props?.width || '24'}
                    height={props?.height || '24'}
                    onClick={props?.onClick}
                    viewBox="0 -960 960 960">
                    <path fill={props?.color || color} d="M800-680q-17 0-28.5-11.5T760-720v-40h-40q-17 0-28.5-11.5T680-800q0-17 11.5-28.5T720-840h40v-40q0-17 11.5-28.5T800-920q17 0 28.5 11.5T840-880v40h40q17 0 28.5 11.5T920-800q0 17-11.5 28.5T880-760h-40v40q0 17-11.5 28.5T800-680ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l50-54q11-12 26.5-19t32.5-7h205q17 0 28.5 11.5T600-800v60q0 25 17.5 42.5T660-680h20v20q0 25 17.5 42.5T740-600h60q17 0 28.5 11.5T840-560v360q0 33-23.5 56.5T760-120H120Z" />
                </svg>
            }

            {props?.id === 'burger' &&
                <svg
                    width={props?.width || '40'}
                    height={props?.height || '32'}
                    viewBox="0 0 40 32"
                    style={{ 'cursor': 'pointer' }}
                    onClick={props?.onClick}
                >
                    <rect width="39.5789" height="5.05263" rx="2.52632"
                        fill={props?.color || color} />
                    <rect y="13.4736" width="39.5789" height="5.05263" rx="2.52632"
                        fill={props?.color || color} />
                    <rect x="0.289062" y="27" width="28" height="5" rx="2.5"
                        fill={props?.color || color} />
                </svg>
            }

            {props?.id === 'close' &&
                <svg
                    width={props?.width || '32'}
                    height={props?.height || '33'}
                    viewBox="0 0 32 33"
                    style={{ 'cursor': 'pointer' }}
                    onClick={props?.onClick}
                >
                    <rect y="28.7332" width="39.5789" height="5.05263" rx="2.52632" transform="rotate(-45 0 28.7332)" fill={props?.color || color} />
                    <rect x="3.85156" y="1" width="39.5789" height="5.05263" rx="2.52632" transform="rotate(45 3.85156 1)" fill={props?.color || color} />
                </svg>

            }

            {props?.id === 'account' &&
                <svg
                    width={props?.width || '44'}
                    height={props?.height || '44'}
                    viewBox="0 0 44 44"
                    style={{ 'cursor': 'pointer' }}
                    onClick={props?.onClick}
                >
                    <path d="M8.42096 33.2825C10.2801 31.8608 12.358 30.7398 14.6546 29.9196C16.9513 29.0994 19.3573 28.6893 21.8726 28.6893C24.388 28.6893 26.7939 29.0994 29.0906 29.9196C31.3872 30.7398 33.4651 31.8608 35.3243 33.2825C36.6002 31.7879 37.5936 30.0928 38.3044 28.1971C39.0153 26.3015 39.3707 24.2783 39.3707 22.1275C39.3707 17.2791 37.6665 13.1506 34.258 9.74213C30.8495 6.33365 26.721 4.62941 21.8726 4.62941C17.0242 4.62941 12.8957 6.33365 9.48725 9.74213C6.07876 13.1506 4.37452 17.2791 4.37452 22.1275C4.37452 24.2783 4.72995 26.3015 5.44081 28.1971C6.15167 30.0928 7.14505 31.7879 8.42096 33.2825ZM21.8726 24.3148C19.7218 24.3148 17.9082 23.5766 16.4318 22.1002C14.9554 20.6238 14.2172 18.8101 14.2172 16.6593C14.2172 14.5085 14.9554 12.6949 16.4318 11.2185C17.9082 9.74213 19.7218 9.00393 21.8726 9.00393C24.0234 9.00393 25.837 9.74213 27.3134 11.2185C28.7898 12.6949 29.528 14.5085 29.528 16.6593C29.528 18.8101 28.7898 20.6238 27.3134 22.1002C25.837 23.5766 24.0234 24.3148 21.8726 24.3148ZM21.8726 44.0001C18.8469 44.0001 16.0035 43.4259 13.3423 42.2776C10.6811 41.1293 8.36627 39.5709 6.39774 37.6024C4.4292 35.6338 2.87078 33.319 1.72247 30.6578C0.574156 27.9966 0 25.1532 0 22.1275C0 19.1018 0.574156 16.2583 1.72247 13.5972C2.87078 10.936 4.4292 8.62116 6.39774 6.65262C8.36627 4.68409 10.6811 3.12566 13.3423 1.97735C16.0035 0.829039 18.8469 0.254883 21.8726 0.254883C24.8983 0.254883 27.7418 0.829039 30.4029 1.97735C33.0641 3.12566 35.3789 4.68409 37.3475 6.65262C39.316 8.62116 40.8744 10.936 42.0228 13.5972C43.1711 16.2583 43.7452 19.1018 43.7452 22.1275C43.7452 25.1532 43.1711 27.9966 42.0228 30.6578C40.8744 33.319 39.316 35.6338 37.3475 37.6024C35.3789 39.5709 33.0641 41.1293 30.4029 42.2776C27.7418 43.4259 24.8983 44.0001 21.8726 44.0001Z"
                        fill={props?.color || color} />
                </svg>

            }


            {props?.id === 'notifications' &&
                <svg
                    width={props?.width || '33'}
                    height={props?.height || '41'}
                    viewBox="0 0 33 41"
                    onClick={props?.onClick}
                    style={props?.style}
                >
                    <path d="M1.70325 34.6098C1.21412 34.6098 0.80795 34.4482 0.48475 34.1251C0.161583 33.8019 0 33.3957 0 32.9066C0 32.4174 0.161583 32.0112 0.48475 31.688C0.80795 31.3649 1.21412 31.2033 1.70325 31.2033H3.89235V16.3022C3.89235 13.4329 4.7313 10.8534 6.4092 8.5638C8.0871 6.2742 10.3159 4.8341 13.0956 4.2435V3.21525C13.0956 2.31882 13.4063 1.55883 14.0275 0.9353C14.6486 0.311766 15.4058 0 16.2989 0C17.192 0 17.9492 0.311766 18.5704 0.9353C19.1916 1.55883 19.5021 2.31882 19.5021 3.21525V4.2435C22.2819 4.8261 24.5127 6.2636 26.1945 8.556C27.8764 10.8484 28.7174 13.4305 28.7174 16.3022V31.2033H30.8946C31.3827 31.2033 31.7906 31.3649 32.1183 31.688C32.4459 32.0112 32.6098 32.4174 32.6098 32.9066C32.6098 33.3957 32.4459 33.8019 32.1183 34.1251C31.7906 34.4482 31.3827 34.6098 30.8946 34.6098H1.70325ZM16.3049 40.7174C15.177 40.7174 14.2114 40.3162 13.4081 39.5136C12.6049 38.711 12.2032 37.7431 12.2032 36.6098H20.4065C20.4065 37.7417 20.0049 38.7093 19.2016 39.5126C18.3984 40.3158 17.4328 40.7174 16.3049 40.7174Z"
                        fill={props?.color || color} />
                </svg>
            }

            {props?.id === 'messages' &&
                <svg
                    width={props?.width || '33'}
                    height={props?.height || '41'}
                    viewBox="0 0 41 33"
                    onClick={props?.onClick}
                    style={props?.style}
                >
                    <path d="M3.4065 32.6098C2.48653 32.6098 1.68878 32.2721 1.01325 31.5966C0.33775 30.921 0 30.1233 0 29.2033V3.4185C0 2.49527 0.33775 1.69472 1.01325 1.01685C1.68878 0.338952 2.48653 0 3.4065 0H37.1913C38.1145 0 38.9151 0.338952 39.593 1.01685C40.2709 1.69472 40.6098 2.49527 40.6098 3.4185V29.2033C40.6098 30.1233 40.2709 30.921 39.593 31.5966C38.9151 32.2721 38.1145 32.6098 37.1913 32.6098H3.4065ZM20.2989 17.2457C20.4815 17.2457 20.6411 17.2187 20.7777 17.1647C20.9143 17.1107 21.0618 17.0422 21.2201 16.9592L36.6435 6.8294C36.8101 6.73337 36.9431 6.59305 37.0424 6.40845C37.1417 6.22385 37.1913 6.01854 37.1913 5.7925C37.1913 5.32437 36.9797 4.95062 36.5565 4.67125C36.1333 4.39188 35.7018 4.40149 35.262 4.70005L20.2989 14.3185L5.38585 4.70005C4.94602 4.40945 4.50617 4.3888 4.0663 4.6381C3.62643 4.88737 3.4065 5.25594 3.4065 5.7438C3.4065 5.96664 3.46447 6.17628 3.5804 6.37275C3.69637 6.56922 3.82575 6.72168 3.96855 6.83015L19.3779 16.9593C19.5361 17.0423 19.6835 17.1107 19.8201 17.1647C19.9567 17.2187 20.1163 17.2457 20.2989 17.2457Z"
                        fill={props?.color || color} />
                </svg>

            }

            {props?.id === 'logout' &&

                <svg
                    width={props?.width || '41'}
                    height={props?.height || '41'}
                    viewBox="0 -960 960 960"
                    onClick={props?.onClick}
                >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z"
                        fill={props?.color || color} />
                </svg>
            }



            {props?.id === 'musician' &&
                <svg
                    width={props?.width || '30'}
                    height={props?.height || '28'}
                    viewBox="0 0 30 28"
                    fill="none"
                    style={props?.style}
                    onClick={props?.onClick}
                >
                    <g clipPath="url(#clip0_1323_1011)">
                        <path d="M19.4671 0.617431C19.2947 0.831137 19.3316 0.927086 19.6083 0.994377C19.6886 1.01408 19.7561 1.03085 19.7555 1.0334C19.7574 1.03653 19.4553 1.31482 19.4533 1.31169C19.4524 1.31013 19.4511 1.2829 19.4485 1.24999C19.4426 1.17595 19.3755 1.02734 19.3185 0.963145C19.281 0.923614 19.2596 0.917368 19.1992 0.926444C19.0677 0.948914 18.9042 1.12696 18.9169 1.23351C18.9256 1.30148 19.022 1.36524 19.1851 1.40522C19.2552 1.42258 19.3118 1.43956 19.3106 1.44466C19.3083 1.44819 19.2345 1.52153 19.1435 1.60978C18.9956 1.75235 18.9314 1.79826 18.9595 1.74005C18.9754 1.70869 18.9244 1.56104 18.8676 1.46863C18.8282 1.40442 18.8058 1.38584 18.752 1.37355C18.6906 1.35951 18.6784 1.36481 18.589 1.43053C18.4804 1.50803 18.4086 1.6276 18.425 1.69732C18.4388 1.75568 18.5659 1.82646 18.7089 1.8551C18.7786 1.86835 18.8369 1.88435 18.8407 1.89062C18.8446 1.89688 18.7877 1.96198 18.7139 2.03532C18.6418 2.10768 18.576 2.17612 18.5683 2.18514C18.5584 2.19768 18.543 2.17263 18.5196 2.0986C18.4675 1.93861 18.4166 1.86638 18.3401 1.84217C18.2835 1.82519 18.2646 1.8303 18.1879 1.8774C18.085 1.94274 17.9991 2.06448 18.004 2.13696C18.0067 2.21296 18.0883 2.27066 18.2534 2.31378C18.3312 2.3329 18.3939 2.35261 18.3933 2.35516C18.3936 2.35928 18.3272 2.43026 18.2483 2.51321C18.1052 2.66361 18.0617 2.68598 18.0763 2.60585C18.0852 2.54864 18.013 2.35576 17.9608 2.2994C17.8938 2.2262 17.8308 2.22392 17.7263 2.29024C17.5899 2.37619 17.5108 2.51967 17.5579 2.59641C17.5896 2.64809 17.7324 2.71572 17.8478 2.73538C17.9998 2.76069 17.9985 2.77655 17.8267 2.95539C17.744 3.04285 17.6699 3.11208 17.6613 3.10875C17.6536 3.107 17.6475 3.08272 17.6494 3.05352C17.6512 2.97046 17.5681 2.77779 17.5053 2.72575C17.4425 2.67371 17.3965 2.67396 17.307 2.7289C17.1568 2.82113 17.0793 2.96363 17.1322 3.04976C17.1639 3.10144 17.4084 3.20579 17.4615 3.1883C17.4787 3.18417 17.5072 3.19472 17.5245 3.21213C17.555 3.24736 17.5559 3.24893 17.416 3.38659C17.3237 3.47994 17.244 3.66906 17.2458 3.79737C17.2469 3.8959 17.2995 4.01025 17.3834 4.09674C17.419 4.13314 17.419 4.14392 17.3842 4.21271C17.3632 4.25367 17.3485 4.30149 17.354 4.31755C17.3595 4.3336 17.2673 4.54546 17.1506 4.78536C17.0349 5.02682 16.8563 5.39529 16.7549 5.60637C16.6541 5.81491 16.561 6.00365 16.5485 6.02639C16.5377 6.04815 16.4691 6.1873 16.398 6.33665C16.0211 7.131 15.8169 7.54749 15.7978 7.55927C15.785 7.56712 15.7748 7.58632 15.7761 7.60278C15.7774 7.61923 15.6349 7.92458 15.4614 8.28345C15.2879 8.64231 15.0994 9.0341 15.0404 9.1566C14.983 9.27811 14.8628 9.52663 14.7741 9.70832C14.6864 9.89157 14.5726 10.1254 14.5222 10.2297C14.4718 10.3339 14.3385 10.6077 14.2285 10.837C14.1194 11.0679 14.0199 11.2606 14.0103 11.2665C14.0007 11.2724 13.988 11.3018 13.9794 11.3308C13.9717 11.3613 13.9121 11.4972 13.8452 11.6353C13.7466 11.8403 13.3767 12.5959 13.3183 12.7158C13.3024 12.7472 13.2277 12.9052 13.0348 13.3148C12.9809 13.4277 12.934 13.5233 12.9308 13.5253C12.9261 13.5282 12.8855 13.6092 12.8422 13.707C12.7507 13.9055 12.7593 13.8981 12.4598 14.0194C12.1603 14.1408 11.9796 14.1655 11.7963 14.1142C11.636 14.0681 11.5549 13.9971 11.429 13.7919C11.3097 13.5977 11.2602 13.4491 11.2491 13.2554C11.2399 13.0971 11.2701 12.9492 11.4216 12.4291C11.4961 12.1742 11.5062 12.1119 11.4961 11.9843C11.4633 11.6012 11.2224 11.3631 10.8556 11.3533C10.6733 11.3466 10.5131 11.3975 10.353 11.5131C9.75521 11.9405 9.37461 12.625 9.1873 13.6135C9.15332 13.7875 9.08011 14.2702 9.02409 14.6842C8.92691 15.4038 8.84569 15.87 8.79725 15.9989C8.76539 16.0832 8.63517 16.2796 8.53682 16.3917C8.32735 16.6347 8.10885 16.8271 7.69702 17.1382C6.86441 17.7638 6.22243 18.3952 5.76629 19.0355C5.5039 19.4037 5.39898 19.6234 5.35141 19.9114C5.19822 20.8229 5.48222 21.7225 6.13917 22.4125C6.42521 22.7135 6.84204 23.0053 7.49949 23.3629C9.40302 24.4025 11.0852 24.9525 12.0471 24.8493C12.3944 24.8128 12.6923 24.7032 13.0684 24.4701C13.3401 24.3033 13.4682 24.1966 13.6562 23.9797C13.8641 23.7378 14.0919 23.3348 14.2107 22.9944C14.4264 22.3746 14.5693 21.4284 14.5514 20.7256C14.535 20.0218 14.7188 19.4647 15.1606 18.8763C15.3288 18.6522 15.5054 18.4597 15.9791 17.9769C16.3821 17.5655 16.4942 17.4363 16.6222 17.2326C16.8401 16.8852 16.8956 16.56 16.7874 16.2512C16.7444 16.1309 16.5915 15.8819 16.4893 15.7657C16.39 15.6541 16.2988 15.6239 16.121 15.6425C15.8575 15.6684 15.6964 15.7716 15.3966 16.1002C15.2493 16.2618 15.2148 16.2916 15.0423 16.3976C14.8835 16.4973 14.8301 16.5214 14.7271 16.5437C14.4992 16.5952 14.3011 16.5702 14.0944 16.4664C13.9696 16.4028 13.7502 16.2248 13.7281 16.1672C13.7178 16.1434 13.8179 15.8943 14.0302 15.4123C14.2049 15.0161 14.357 14.6725 14.3685 14.6482C14.38 14.6239 14.4594 14.4414 14.5451 14.2443C14.6299 14.0456 14.708 13.879 14.716 13.8741C14.724 13.8691 14.7409 13.8286 14.7533 13.7843C14.7705 13.7263 15.3593 12.3705 15.535 11.9865C15.572 11.9034 15.7735 11.4433 15.8315 11.3084C15.8596 11.2395 15.9236 11.0966 15.9705 10.9902C16.019 10.8828 16.3085 10.2219 16.6164 9.51949C16.9238 8.81963 17.1884 8.23657 17.2076 8.22479C17.2252 8.214 17.2338 8.19577 17.2261 8.18324C17.2126 8.16132 17.5088 7.45755 17.5375 7.43989C17.5455 7.43498 17.5531 7.41519 17.5566 7.39579C17.5617 7.36464 17.8346 6.72692 17.8834 6.6344C17.892 6.61618 17.9765 6.42411 18.0715 6.20618C18.1665 5.98824 18.25 5.79461 18.2596 5.77795C18.2682 5.75972 18.3591 5.55296 18.4611 5.31778C18.5806 5.03949 18.6549 4.88818 18.6719 4.89071C18.7058 4.89576 18.7788 4.728 18.7567 4.69198C18.7432 4.67005 18.7614 4.65671 18.9276 4.56545C19.1012 4.47182 19.324 4.38677 19.6229 4.30026L19.7482 4.26428L19.8277 4.11414C19.954 3.86835 20.0446 3.52153 20.1426 2.91788C20.1708 2.73449 20.2181 2.47468 20.2445 2.34204L20.294 2.10025L20.3433 2.13037C20.5239 2.24164 20.8637 2.15372 21.0633 1.94488C21.215 1.78702 21.2788 1.61849 21.2593 1.42555C21.2486 1.32213 21.2364 1.29511 21.1268 1.11658C20.9517 0.83154 20.7862 0.68734 20.5785 0.635844C20.4138 0.596841 20.36 0.606105 20.1779 0.717956C20.09 0.77192 19.9916 0.840978 19.9597 0.871376L19.8996 0.927661L19.8941 0.857732C19.8908 0.816599 19.86 0.73416 19.818 0.65859C19.7551 0.541904 19.7423 0.528204 19.6956 0.520223C19.6438 0.511071 19.5044 0.570769 19.4671 0.617431Z"
                            fill={props?.color || color} />
                    </g>
                    <defs>
                        <clipPath id="clip0_1323_1011">
                            <rect width="24" height="17" fill="white" transform="translate(0 12.5586) rotate(-31.5528)" />
                        </clipPath>
                    </defs>
                </svg>
            }

            {props?.id === 'studio' &&
                <svg
                    width={props?.width || '17'}
                    height={props?.height || '23'}
                    style={props?.style}
                    onClick={props?.onClick}
                    viewBox="0 0 17 23"
                    fill="none"
                >
                    <path d="M8.37595 13.6849C7.48403 13.6849 6.73753 13.3657 6.13645 12.7273C5.53536 12.089 5.23482 11.3125 5.23482 10.3979V3.11194C5.23482 2.25061 5.53965 1.51662 6.14931 0.90997C6.75899 0.303323 7.50063 0 8.37423 0C9.24785 0 9.99122 0.303323 10.6043 0.90997C11.2175 1.51662 11.5241 2.25061 11.5241 3.11194V10.3979C11.5241 11.3125 11.2223 12.089 10.6189 12.7273C10.0155 13.3657 9.26787 13.6849 8.37595 13.6849ZM8.37085 22.6061C8.10286 22.6061 7.87809 22.5141 7.69654 22.3301C7.51501 22.1461 7.42424 21.9185 7.42424 21.6474V18.6115C5.47217 18.3976 3.8065 17.6205 2.4272 16.2801C1.04793 14.9397 0.242047 13.3249 0.00954951 11.4359C-0.0293394 11.1598 0.0505484 10.9178 0.249212 10.7099C0.447896 10.5019 0.699623 10.3979 1.0044 10.3979C1.21786 10.3979 1.41177 10.4792 1.58612 10.6417C1.7605 10.8042 1.86946 11.0017 1.913 11.2342C2.13618 12.8278 2.85072 14.1506 4.05663 15.2025C5.26252 16.2544 6.70056 16.7803 8.37076 16.7803C10.0409 16.7803 11.4807 16.2544 12.6901 15.2025C13.8994 14.1506 14.6157 12.8278 14.8389 11.2342C14.887 10.9969 14.9992 10.7982 15.1752 10.6381C15.3513 10.478 15.5501 10.3979 15.7717 10.3979C16.0752 10.3979 16.3225 10.5019 16.5138 10.7099C16.705 10.9178 16.7812 11.1598 16.7423 11.4359C16.5099 13.3249 15.704 14.9397 14.3247 16.2801C12.9454 17.6205 11.2797 18.3976 9.32766 18.6115V21.6474C9.32766 21.9185 9.23518 22.1461 9.05023 22.3301C8.86527 22.5141 8.63881 22.6061 8.37085 22.6061Z"
                        fill={props?.color || color} />
                </svg>
            }

            {props?.id === 'band' &&
                <svg
                    width={props?.width || '25'}
                    height={props?.height || '13'}
                    style={props?.style}
                    onClick={props?.onClick}
                    viewBox="0 0 25 13"
                    fill="none"
                >
                    <path d="M0.851625 12.281C0.611225 12.281 0.409183 12.1992 0.2455 12.0355C0.0818333 11.8718 0 11.6697 0 11.4293V10.8842C0 10.2048 0.350717 9.6605 1.05215 9.2513C1.7536 8.8421 2.67679 8.6375 3.82173 8.6375C3.99553 8.6375 4.16813 8.64276 4.33953 8.65327C4.51093 8.66377 4.67583 8.67754 4.83423 8.69458C4.69691 8.98986 4.59193 9.29422 4.51928 9.60765C4.44662 9.92108 4.4103 10.2549 4.4103 10.6093V12.281H0.851625ZM6.85162 12.281C6.61123 12.281 6.40918 12.1992 6.2455 12.0355C6.08182 11.8718 5.99998 11.6697 5.99998 11.4293V10.6093C5.99998 9.50152 6.55983 8.60429 7.67955 7.91758C8.79925 7.23086 10.263 6.8875 12.0709 6.8875C13.8922 6.8875 15.3596 7.23086 16.4732 7.91758C17.5867 8.60429 18.1435 9.50152 18.1435 10.6093V11.4293C18.1435 11.6697 18.0616 11.8718 17.898 12.0355C17.7343 12.1992 17.5322 12.281 17.2918 12.281H6.85162ZM19.7332 12.281V10.6066C19.7332 10.2554 19.6978 9.92173 19.6272 9.60565C19.5565 9.28957 19.4505 8.9836 19.3092 8.68775C19.4676 8.66693 19.6325 8.65336 19.8039 8.64703C19.9753 8.64067 20.1486 8.6375 20.3238 8.6375C21.459 8.6375 22.3794 8.8421 23.0851 9.2513C23.7907 9.6605 24.1435 10.2048 24.1435 10.8842V11.4293C24.1435 11.6697 24.0616 11.8718 23.898 12.0355C23.7343 12.1992 23.5322 12.281 23.2918 12.281H19.7332ZM3.82025 7.90545C3.32195 7.90545 2.89898 7.73007 2.55135 7.3793C2.2037 7.02853 2.02988 6.6039 2.02988 6.1054C2.02988 5.61158 2.20478 5.18986 2.55458 4.84023C2.90436 4.49059 3.32782 4.31577 3.82495 4.31577C4.32208 4.31577 4.74547 4.49133 5.0951 4.84245C5.44473 5.19355 5.61955 5.61701 5.61955 6.11282C5.61955 6.60862 5.44424 7.03135 5.09363 7.381C4.74301 7.73063 4.31855 7.90545 3.82025 7.90545ZM20.3202 7.90545C19.822 7.90545 19.399 7.73007 19.0514 7.3793C18.7037 7.02853 18.5299 6.6039 18.5299 6.1054C18.5299 5.61158 18.7048 5.18986 19.0546 4.84023C19.4044 4.49059 19.8278 4.31577 20.325 4.31577C20.8221 4.31577 21.2455 4.49133 21.5951 4.84245C21.9447 5.19355 22.1196 5.61701 22.1196 6.11282C22.1196 6.60862 21.9442 7.03135 21.5936 7.381C21.243 7.73063 20.8186 7.90545 20.3202 7.90545ZM12.0717 6.1435C11.2185 6.1435 10.4932 5.84486 9.8959 5.24758C9.29862 4.65029 8.99998 3.92502 8.99998 3.07175C8.99998 2.21848 9.29862 1.49321 9.8959 0.895924C10.4932 0.298641 11.2185 0 12.0717 0C12.925 0 13.6503 0.298641 14.2476 0.895924C14.8448 1.49321 15.1435 2.21848 15.1435 3.07175C15.1435 3.92502 14.8448 4.65029 14.2476 5.24758C13.6503 5.84486 12.925 6.1435 12.0717 6.1435Z"
                        fill={props?.color || color} />
                </svg>
            }

            {props?.id === 'stage' &&

                <svg
                    width={props?.width || '19'}
                    height={props?.height || '24'}
                    style={props?.style}
                    onClick={props?.onClick}
                    viewBox="0 0 19 24"
                    fill="none" >
                    <path d="M3.96194 17.4032C2.9756 17.4032 2.13967 17.0618 1.45412 16.379C0.768561 15.6961 0.425781 14.8606 0.425781 13.8725C0.425781 12.8844 0.767201 12.0489 1.45004 11.3661C2.13287 10.6833 2.96834 10.3419 3.95646 10.3419C4.36662 10.3419 4.73611 10.3984 5.06492 10.5115C5.39373 10.6246 5.68068 10.7808 5.92578 10.98V2.15763C5.92578 1.72293 6.07825 1.35313 6.38317 1.04821C6.6881 0.743285 7.05791 0.59082 7.49259 0.59082H9.94468C10.398 0.59082 10.7828 0.748914 11.099 1.0651C11.4152 1.38128 11.5733 1.76725 11.5733 2.22304C11.5733 2.67882 11.4152 3.06832 11.099 3.39154C10.7828 3.71477 10.398 3.87638 9.94468 3.87638H7.49259V13.8725C7.49259 14.8606 7.15118 15.6961 6.46836 16.379C5.78553 17.0618 4.95006 17.4032 3.96194 17.4032Z"
                        fill={props?.color || color} />
                    <path d="M12.519 23.1115C11.8017 23.1115 11.1937 22.8632 10.6951 22.3666C10.1966 21.8699 9.94727 21.2623 9.94727 20.5437C9.94727 19.8251 10.1956 19.2175 10.6922 18.7208C11.1888 18.2242 11.7964 17.9759 12.515 17.9759C12.8133 17.9759 13.082 18.0171 13.3212 18.0993C13.5603 18.1816 13.769 18.2952 13.9473 18.4401V12.0238C13.9473 11.7076 14.0581 11.4387 14.2799 11.2169C14.5017 10.9952 14.7706 10.8843 15.0868 10.8843H16.8701C17.1998 10.8843 17.4796 10.9993 17.7096 11.2292C17.9396 11.4592 18.0545 11.7399 18.0545 12.0713C18.0545 12.4028 17.9396 12.6861 17.7096 12.9212C17.4796 13.1562 17.1998 13.2738 16.8701 13.2738H15.0868V20.5437C15.0868 21.2623 14.8385 21.8699 14.3419 22.3666C13.8453 22.8632 13.2376 23.1115 12.519 23.1115Z"
                        fill={props?.color || color} />
                </svg>
            }


            {props?.id === 'store' &&

                <svg
                    width={props?.width || '20'}
                    height={props?.height || '18'}
                    style={props?.style}
                    onClick={props?.onClick}
                    viewBox="0 0 20 18"
                    fill="none" >
                    <path d="M2.8759 2.67501C2.6355 2.67501 2.43346 2.59275 2.26978 2.42823C2.10611 2.26372 2.02428 2.06063 2.02428 1.81898C2.02428 1.57735 2.10611 1.37473 2.26978 1.21113C2.43346 1.04755 2.6355 0.965759 2.8759 0.965759H17.1759C17.4163 0.965759 17.6183 1.04902 17.782 1.21553C17.9457 1.38205 18.0275 1.58613 18.0275 1.82776C18.0275 2.06941 17.9457 2.27103 17.782 2.43261C17.6183 2.59421 17.4163 2.67501 17.1759 2.67501H2.8759ZM3.0009 17.0533C2.7605 17.0533 2.55846 16.9714 2.39478 16.8078C2.23111 16.6441 2.14928 16.442 2.14928 16.2016V10.9283H1.54818C1.28463 10.9163 1.07245 10.8067 0.911651 10.5995C0.750851 10.3922 0.699442 10.16 0.757426 9.90273L1.87535 4.85273C1.91267 4.64947 2.01004 4.4857 2.16748 4.36143C2.32491 4.23715 2.50308 4.17501 2.70198 4.17501H17.3248C17.5237 4.17501 17.7019 4.23715 17.8593 4.36143C18.0168 4.4857 18.1141 4.64947 18.1515 4.85273L19.2694 9.90273C19.3274 10.164 19.275 10.4002 19.1122 10.6114C18.9494 10.8227 18.7402 10.9283 18.4846 10.9283H17.8775V16.2016C17.8775 16.442 17.7953 16.6441 17.6308 16.8078C17.4662 16.9714 17.2632 17.0533 17.0215 17.0533C16.7799 17.0533 16.5783 16.9714 16.4167 16.8078C16.2551 16.6441 16.1743 16.442 16.1743 16.2016V10.9283H11.9025V16.2016C11.9025 16.442 11.8207 16.6441 11.657 16.8078C11.4933 16.9714 11.2913 17.0533 11.0509 17.0533H3.0009ZM3.85253 15.35H10.1993V10.9283H3.85253V15.35Z"
                        fill={props?.color || color} />
                </svg>

            }

        </>

    )
}
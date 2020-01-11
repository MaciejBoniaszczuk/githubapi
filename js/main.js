!function(c){var e={};function n(l){if(e[l])return e[l].exports;var r=e[l]={i:l,l:!1,exports:{}};return c[l].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=c,n.c=e,n.d=function(c,e,l){n.o(c,e)||Object.defineProperty(c,e,{enumerable:!0,get:l})},n.r=function(c){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(c,"__esModule",{value:!0})},n.t=function(c,e){if(1&e&&(c=n(c)),8&e)return c;if(4&e&&"object"==typeof c&&c&&c.__esModule)return c;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:c}),2&e&&"string"!=typeof c)for(var r in c)n.d(l,r,function(e){return c[e]}.bind(null,r));return l},n.n=function(c){var e=c&&c.__esModule?function(){return c.default}:function(){return c};return n.d(e,"a",e),e},n.o=function(c,e){return Object.prototype.hasOwnProperty.call(c,e)},n.p="",n(n.s=0)}([function(module,exports,__webpack_require__){"use strict";eval("\r\n\r\n// service worker registration - remove if you're not going to use it\r\n\r\nif ('serviceWorker' in navigator) {\r\n  window.addEventListener('load', function () {\r\n    navigator.serviceWorker.register('serviceworker.js').then(function (registration) {\r\n      // Registration was successful\r\n      console.log('ServiceWorker registration successful with scope: ', registration.scope);\r\n    }, function (err) {\r\n      // registration failed :(\r\n      console.log('ServiceWorker registration failed: ', err);\r\n    });\r\n  });\r\n}\r\n\r\n// place your code below\r\n\r\nconst URI = \"https://api.github.com\";\r\nconst button = document.querySelector('.button');\r\nconst input = document.querySelector('.input');\r\nconst loader = document.querySelector('.lds-roller');\r\nconst wrapper = document.querySelector('.wrapper');\r\nconst content = document.querySelector('.content')\r\n\r\nbutton.addEventListener('click', () => {\r\n  if (input.value != \"\") {\r\n    while (content.children.length > 2) {\r\n      content.removeChild(content.lastChild);\r\n    }\r\n    loader.classList.remove('lds-roller--invisible');\r\n    setTimeout(() => {\r\n      getUser(input.value);\r\n      loader.classList.add('lds-roller--invisible');\r\n    }, 300);\r\n  } else {\r\n    wrapper.classList.add('wrapper__shake');\r\n  }\r\n})\r\n\r\nwrapper.addEventListener('animationend', (e) => {\r\n  wrapper.classList.remove('wrapper__shake')\r\n})\r\n\r\nfunction getUser(username) {\r\n  fetch(`${URI}/users/${username}`)\r\n    .then(response => {\r\n      if (response.ok) {\r\n        return response.json();\r\n      } else {\r\n        wrapper.classList.add('wrapper__shake');\r\n        throw new Error(\"Nie znaleziono użytkownika!\");\r\n      }\r\n    })\r\n    .then(response => {\r\n      // Fill profile\r\n      console.log(response);\r\n\r\n      let profile = document.createElement('section');\r\n      profile.classList = 'profile';\r\n\r\n      let img = document.createElement('img');\r\n      img.classList = 'profile__img';\r\n      img.src = response.avatar_url;\r\n\r\n\r\n      let profileInfo = document.createElement('div');\r\n      profileInfo.classList = 'profile__info';\r\n      let profileName = document.createElement('h2');\r\n      profileName.classList = 'profile__name';\r\n      profileName.innerHTML = response.login;\r\n      profileInfo.appendChild(profileName);\r\n\r\n\r\n\r\n\r\n      // Appending\r\n      profile.appendChild(img);\r\n      profile.appendChild(profileInfo);\r\n\r\n      content.appendChild(profile);\r\n\r\n      profileName.innerHTML = response.login;\r\n      return fetch(`${URI}/users/${username}/repos`);\r\n    })\r\n    .then(secondResponse => secondResponse.json())\r\n    .then(secondResponse => {\r\n      console.log(secondResponse);\r\n\r\n      // Creating repos\r\n\r\n      let repos = document.createElement('div');\r\n      let repos__wrapper = document.createElement('div');\r\n      repos__wrapper.classList = 'repos__wrapper';\r\n      if (secondResponse.length > 0) {\r\n        let filter = document.createElement('input');\r\n        filter.type = 'text';\r\n        filter.classList = 'filter';\r\n        filter.placeholder = 'Search repository...'\r\n        filter.addEventListener('keyup', filterRepos);\r\n        repos__wrapper.appendChild(filter);\r\n        for (let item in secondResponse) {\r\n          let repo = document.createElement('div');\r\n          repo.classList = 'repo';\r\n          let repoTitle = document.createElement('a');\r\n          repoTitle.href = secondResponse[item].html_url;\r\n          repoTitle.classList = 'repo__title';\r\n          repoTitle.innerHTML = secondResponse[item].name;\r\n          repo.appendChild(repoTitle);\r\n          repos.classList = 'repos';\r\n          repos.appendChild(repo);\r\n          repos__wrapper.appendChild(repos);\r\n        }\r\n        document.querySelector('.profile').appendChild(repos__wrapper);\r\n      }\r\n\r\n\r\n\r\n    })\r\n    .catch(err => {\r\n      console.dir(err)\r\n    })\r\n}\r\n\r\nfunction filterRepos(e) {\r\n  var listItems = document.querySelectorAll('.repo');\r\n  Array.from(listItems).forEach(item => {\r\n    if (item.innerText.toLowerCase().includes(e.target.value.toLowerCase()))\r\n      item.style.display = 'block';\r\n    else {\r\n      item.style.display = 'none';\r\n    }\r\n  });\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcz85MjkxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxXQUFXLElBQUksU0FBUyxTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0JBQXNCLElBQUksU0FBUyxTQUFTO0FBQzVDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUEsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vLyBzZXJ2aWNlIHdvcmtlciByZWdpc3RyYXRpb24gLSByZW1vdmUgaWYgeW91J3JlIG5vdCBnb2luZyB0byB1c2UgaXRcclxuXHJcbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcignc2VydmljZXdvcmtlci5qcycpLnRoZW4oZnVuY3Rpb24gKHJlZ2lzdHJhdGlvbikge1xyXG4gICAgICAvLyBSZWdpc3RyYXRpb24gd2FzIHN1Y2Nlc3NmdWxcclxuICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2VXb3JrZXIgcmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwgd2l0aCBzY29wZTogJywgcmVnaXN0cmF0aW9uLnNjb3BlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgLy8gcmVnaXN0cmF0aW9uIGZhaWxlZCA6KFxyXG4gICAgICBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkOiAnLCBlcnIpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIHBsYWNlIHlvdXIgY29kZSBiZWxvd1xyXG5cclxuY29uc3QgVVJJID0gXCJodHRwczovL2FwaS5naXRodWIuY29tXCI7XHJcbmNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24nKTtcclxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQnKTtcclxuY29uc3QgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkcy1yb2xsZXInKTtcclxuY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyJyk7XHJcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcblxyXG5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgaWYgKGlucHV0LnZhbHVlICE9IFwiXCIpIHtcclxuICAgIHdoaWxlIChjb250ZW50LmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcclxuICAgICAgY29udGVudC5yZW1vdmVDaGlsZChjb250ZW50Lmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgICBsb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGRzLXJvbGxlci0taW52aXNpYmxlJyk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZ2V0VXNlcihpbnB1dC52YWx1ZSk7XHJcbiAgICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKCdsZHMtcm9sbGVyLS1pbnZpc2libGUnKTtcclxuICAgIH0sIDMwMCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnd3JhcHBlcl9fc2hha2UnKTtcclxuICB9XHJcbn0pXHJcblxyXG53cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIChlKSA9PiB7XHJcbiAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCd3cmFwcGVyX19zaGFrZScpXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBnZXRVc2VyKHVzZXJuYW1lKSB7XHJcbiAgZmV0Y2goYCR7VVJJfS91c2Vycy8ke3VzZXJuYW1lfWApXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCd3cmFwcGVyX19zaGFrZScpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5pZSB6bmFsZXppb25vIHXFvHl0a293bmlrYSFcIik7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIC8vIEZpbGwgcHJvZmlsZVxyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcblxyXG4gICAgICBsZXQgcHJvZmlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcclxuICAgICAgcHJvZmlsZS5jbGFzc0xpc3QgPSAncHJvZmlsZSc7XHJcblxyXG4gICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGltZy5jbGFzc0xpc3QgPSAncHJvZmlsZV9faW1nJztcclxuICAgICAgaW1nLnNyYyA9IHJlc3BvbnNlLmF2YXRhcl91cmw7XHJcblxyXG5cclxuICAgICAgbGV0IHByb2ZpbGVJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHByb2ZpbGVJbmZvLmNsYXNzTGlzdCA9ICdwcm9maWxlX19pbmZvJztcclxuICAgICAgbGV0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcclxuICAgICAgcHJvZmlsZU5hbWUuY2xhc3NMaXN0ID0gJ3Byb2ZpbGVfX25hbWUnO1xyXG4gICAgICBwcm9maWxlTmFtZS5pbm5lckhUTUwgPSByZXNwb25zZS5sb2dpbjtcclxuICAgICAgcHJvZmlsZUluZm8uYXBwZW5kQ2hpbGQocHJvZmlsZU5hbWUpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgLy8gQXBwZW5kaW5nXHJcbiAgICAgIHByb2ZpbGUuYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgcHJvZmlsZS5hcHBlbmRDaGlsZChwcm9maWxlSW5mbyk7XHJcblxyXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKHByb2ZpbGUpO1xyXG5cclxuICAgICAgcHJvZmlsZU5hbWUuaW5uZXJIVE1MID0gcmVzcG9uc2UubG9naW47XHJcbiAgICAgIHJldHVybiBmZXRjaChgJHtVUkl9L3VzZXJzLyR7dXNlcm5hbWV9L3JlcG9zYCk7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oc2Vjb25kUmVzcG9uc2UgPT4gc2Vjb25kUmVzcG9uc2UuanNvbigpKVxyXG4gICAgLnRoZW4oc2Vjb25kUmVzcG9uc2UgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhzZWNvbmRSZXNwb25zZSk7XHJcblxyXG4gICAgICAvLyBDcmVhdGluZyByZXBvc1xyXG5cclxuICAgICAgbGV0IHJlcG9zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGxldCByZXBvc19fd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICByZXBvc19fd3JhcHBlci5jbGFzc0xpc3QgPSAncmVwb3NfX3dyYXBwZXInO1xyXG4gICAgICBpZiAoc2Vjb25kUmVzcG9uc2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGxldCBmaWx0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIGZpbHRlci50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgIGZpbHRlci5jbGFzc0xpc3QgPSAnZmlsdGVyJztcclxuICAgICAgICBmaWx0ZXIucGxhY2Vob2xkZXIgPSAnU2VhcmNoIHJlcG9zaXRvcnkuLi4nXHJcbiAgICAgICAgZmlsdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZmlsdGVyUmVwb3MpO1xyXG4gICAgICAgIHJlcG9zX193cmFwcGVyLmFwcGVuZENoaWxkKGZpbHRlcik7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBpbiBzZWNvbmRSZXNwb25zZSkge1xyXG4gICAgICAgICAgbGV0IHJlcG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgIHJlcG8uY2xhc3NMaXN0ID0gJ3JlcG8nO1xyXG4gICAgICAgICAgbGV0IHJlcG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgIHJlcG9UaXRsZS5ocmVmID0gc2Vjb25kUmVzcG9uc2VbaXRlbV0uaHRtbF91cmw7XHJcbiAgICAgICAgICByZXBvVGl0bGUuY2xhc3NMaXN0ID0gJ3JlcG9fX3RpdGxlJztcclxuICAgICAgICAgIHJlcG9UaXRsZS5pbm5lckhUTUwgPSBzZWNvbmRSZXNwb25zZVtpdGVtXS5uYW1lO1xyXG4gICAgICAgICAgcmVwby5hcHBlbmRDaGlsZChyZXBvVGl0bGUpO1xyXG4gICAgICAgICAgcmVwb3MuY2xhc3NMaXN0ID0gJ3JlcG9zJztcclxuICAgICAgICAgIHJlcG9zLmFwcGVuZENoaWxkKHJlcG8pO1xyXG4gICAgICAgICAgcmVwb3NfX3dyYXBwZXIuYXBwZW5kQ2hpbGQocmVwb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZScpLmFwcGVuZENoaWxkKHJlcG9zX193cmFwcGVyKTtcclxuICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmRpcihlcnIpXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJSZXBvcyhlKSB7XHJcbiAgdmFyIGxpc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXBvJyk7XHJcbiAgQXJyYXkuZnJvbShsaXN0SXRlbXMpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpZiAoaXRlbS5pbm5lclRleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhlLnRhcmdldC52YWx1ZS50b0xvd2VyQ2FzZSgpKSlcclxuICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIGVsc2Uge1xyXG4gICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n")}]);
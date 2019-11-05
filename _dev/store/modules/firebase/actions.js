/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
import * as types from './mutation-types';
import ajax from '@/requests/ajax.js';

export default {
  logOut({commit, getters}) {
    return ajax({
      url: getters.adminController,
      action: 'LogOutPsAccount',
    }).then(() => {
      commit(types.LOGOUT_ACCOUNT);
      return Promise.resolve(true);
    });
  },

  signIn({commit, getters}, payload) {
    return ajax({
      url: getters.adminController,
      action: 'SignIn',
      data: {
        email: payload.email,
        password: payload.password,
      },
    }).then((user) => {
      if (user.error) {
        return Promise.reject(user);
      }

      commit(types.UPDATE_ACCOUNT, {
        email: user.email,
        idToken: user.idToken,
        localId: user.localId,
        refreshToken: user.refreshToken,
        onboardingCompleted: true,
      });

      return Promise.resolve(user);
    });
  },

  signUp({commit, getters}, payload) {
    return ajax({
      url: getters.adminController,
      action: 'SignUp',
      data: {
        email: payload.email,
        password: payload.password,
      },
    }).then((user) => {
      if (user.error) {
        return Promise.reject(user);
      }

      commit(types.UPDATE_ACCOUNT, {
        email: user.email,
        idToken: user.idToken,
        localId: user.localId,
        refreshToken: user.refreshToken,
        onboardingCompleted: true,
      });

      return Promise.resolve(user);
    });
  },
};

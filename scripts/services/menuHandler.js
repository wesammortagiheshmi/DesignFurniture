(function() {
    'use strict';
    var gma = angular.module('GMA');
    gma.factory('menuHandler', function(menuTemplates) {
        return {
            templateName: function(templateId) {
                var menuItem = _.find(menuTemplates, function(menuTemplate) {
                    return menuTemplate.Id == templateId;
                });
                if (_.isUndefined(menuItem)) return "";
                return menuItem.Name;
            },

            getMenuItemState: function(menuItem) {
                var menuItemState;
                if (menuItem.TemplateId == null) // is an empty menu
                    menuItemState = 'main.submenus';
                else
                    menuItemState = 'main.' + this.templateName(menuItem.TemplateId);
                return menuItemState;
            },


            mapMenuTemplateRoute: function (menuItem) {
                menuItem.sref = this.getMenuItemState(menuItem) + '({id: ' + menuItem.Id + '})';
                return menuItem;
            }
        };
    });
})();
(function() {
    'use strict';

    angular
        .module('timeTracker')
        .controller('TimeEntry', TimeEntry);

    function TimeEntry(time) {
        var vm = this;
        vm.timeEntries = [];

        vm.totalTime = {};

        vm.clockIn = new Date();
        vm.clockOut = new Date();

        time.getTime().then(function(results) {
            vm.timeEntries = results;
            updateTotalTime(vm.timeEntries);
        }, function(error) {
            console.log(error);
        });

        function updateTotalTime(timeEntries) {
            console.log(timeEntries);
            vm.totalTime = time.getTotalTime(timeEntries);
        }

        vm.logNewTime = function() {

            if(vm.clockOut < vm.clockIn) {
                alert('You cant clock out before you clock in!');
                return;
            }

            if(vm.clockOut - vm.clockIn === 0) {
                alert('Your time entry has to be greater than zero!');
                return;
            }

            vm.timeEntries.push({
                "user_id": 1,
                "user_firstname": "Ole Andreas",
                "user_lastname": "Hansen",
                "start_time": vm.clockIn,
                "end_time": vm.clockOut,
                "loggedTime": time.getTimeDiff(vm.clockIn, vm.clockOut),
                "comment": vm.comment
            });

            updateTotalTime(vm.timeEntries);

            vm.comment = "";
        }
    }
})();
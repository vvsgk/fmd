angular.module('CryptoDashboard', [])
    .controller('DashboardController', function ($scope, $http) {
        
        // Default to ICICI
        $scope.selectedBank = 'icici';

        // Fetch data based on selected bank
        $scope.fetchData = function (bank) {
            const jsonFile = bank === 'all' ? 'all.json' : `${bank}.json`;

            $http.get(jsonFile).then(function (response) {
                // Set data from JSON
                $scope.transactions = response.data.transactions;
                $scope.balance = $scope.transactions.reduce(function (acc, transaction) {
                    return transaction.TransactionType === 'Credit' ? acc + transaction.Amount : acc - transaction.Amount;
                }, 0);

                // Set latest transaction (just as an example)
                $scope.latestTransaction = $scope.transactions[0];

                // Update graph
                $scope.updateGraph($scope.transactions);
            }).catch(function (error) {
                console.error("Error loading data:", error);
            });
        };

        // Update graph based on transaction data
        $scope.updateGraph = function (transactions) {
            const transactionAmounts = transactions.map(tx => tx.Amount);
            const transactionLabels = transactions.map(tx => tx.TransactionDate);

            const ctx = document.getElementById('cryptoChart').getContext('2d');
            if (window.myChart) {
                window.myChart.destroy();
            }

            window.myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: transactionLabels,
                    datasets: [{
                        label: 'Transaction Amounts',
                        data: transactionAmounts,
                        borderColor: '#4CAF50',
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true
                        }
                    }
                }
            });
        };

        // Initial load for ICICI data
        $scope.fetchData($scope.selectedBank);
        
        // Sidebar toggle functionality
        document.getElementById('sidebarToggle').addEventListener('click', function () {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed');
            const mainContent = document.getElementById('main-content');
            mainContent.classList.toggle('collapsed');
        });
    });

module.exports.questions = [
    {
        name: 'project-name',
        type: 'input',
        message: 'Project name:',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else
                return 'Project name may only include letters, numbers, underscores and hashes.';
        },
    },
    {
        name: 'separate-folder',
        type: 'list',
        message: 'Do you want to create the project in separate folder ?',
        choices: ['Y', 'N']
    }
]
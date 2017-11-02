node {
    stage("checkout") {
        git branch: 'development', url: 'https://github.com/Diluv/Website'
    }

    stage("build") {
        if (isUnix()) {
            sh 'npm install'
            sh 'npm run stage'
        } else {
            bat 'npm install'
            bat 'npm run stage'
        }
    }

    stage("deploy") {
        if (env.BRANCH_NAME == 'master') {
            
        } else {
            if (isUnix()) {
                ansiblePlaybook('deploy.yml')
            } else {
            }
        }
    }
}
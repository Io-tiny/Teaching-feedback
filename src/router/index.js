import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/login/register')), 'register');
const sindex = r => require.ensure([], () => r(require('@/page/student/sindex')), 'sindex');
const home = r => require.ensure([], () => r(require('@/page/student/home')), 'home');
const sinfo = r => require.ensure([], () => r(require('@/page/student/sinfo')), 'sinfo');
const introduction = r => require.ensure([], () => r(require('@/page/student/introduction')), 'introduction');
const exam = r => require.ensure([], () => r(require('@/page/student/exam')), 'exam');
const selecthomework = r => require.ensure([], () => r(require('@/page/student/selecthomework')), 'selecthomework');
const finishhomework = r => require.ensure([], () => r(require('@/page/student/finishhomework')), 'finishhomework');
const feedback = r => require.ensure([], () => r(require('@/page/student/feedback')), 'feedback');
const sradio = r => require.ensure([], () => r(require('@/page/student/sradio')), 'sradio');
const finishtest = r => require.ensure([], () => r(require('@/page/student/finishtest')), 'finishtest');
const scoresearch = r => require.ensure([], () => r(require('@/page/student/scoresearch')), 'scoresearch');


const tindex = r => require.ensure([], () => r(require('@/page/teacher/tindex')), 'tindex');
const thome = r => require.ensure([], () => r(require('@/page/teacher/thome')), 'thome');
const tinfo = r => require.ensure([], () => r(require('@/page/teacher/tinfo')), 'tinfo');
const tclass = r => require.ensure([], () => r(require('@/page/teacher/tclass')), 'tinfo');
const tintroduction = r => require.ensure([], () => r(require('@/page/teacher/tintroduction')), 'tintroduction');
const titem = r => require.ensure([], () => r(require('@/page/teacher/titem')), 'titem');
const tsetexam = r => require.ensure([], () => r(require('@/page/teacher/tsetexam')), 'tsetexam');
const tsethomework = r => require.ensure([], () => r(require('@/page/teacher/tsethomework')), 'tsethomework');
const thomework = r => require.ensure([], () => r(require('@/page/teacher/thomework')), 'thomework');
const tfeedback = r => require.ensure([], () => r(require('@/page/teacher/tfeedback')), 'tfeedback');
const tradio = r => require.ensure([], () => r(require('@/page/teacher/tradio')), 'tradio');
const tfinish = r => require.ensure([], () => r(require('@/page/teacher/tfinish')), 'tfinish');
const thomeitem = r => require.ensure([], () => r(require('@/page/teacher/thomeitem')), 'thomeitem');
const appraise = r => require.ensure([], () => r(require('@/page/teacher/appraise')), 'appraise');
const studentfeedback = r => require.ensure([], () => r(require('@/page/teacher/studentfeedback')), 'studentfeedback');

const ahome = r => require.ensure([], () => r(require('@/page/administrator/ahome')), 'ahome');
const aindex = r => require.ensure([], () => r(require('@/page/administrator/aindex')), 'aindex');
const astudent = r => require.ensure([], () => r(require('@/page/administrator/astudent')), 'astudent');
const ateacher = r => require.ensure([], () => r(require('@/page/administrator/ateacher')), 'ateacher');
const asubject = r => require.ensure([], () => r(require('@/page/administrator/asubject')), 'asubject');
const aclass = r => require.ensure([], () => r(require('@/page/administrator/aclass')), 'aclass');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/register',
		component: register
	},
	{
		path: '/sindex',
		component: sindex,
		name: 'sindex',
		children: [{
			path: '/home',
			component: home,
			meta: [],
		},{
			path: '/sinfo',
			component: sinfo,
			meta: ['信息', '学生信息'],
		},{
			path: '/introduction',
			component: introduction,
			meta: ['学科信息', '学科介绍'],
		},{
			path: '/exam',
			component: exam,
			meta: ['考试模块', '选择试题'],
		},{
			path: '/finishtest',
			component: finishtest,
			meta: ['考试模块', '考试查看'],
		},{
			path: '/selecthomework',
			component: selecthomework,
			meta: ['作业模块', '作业查看'],
		},{
			path: '/finishhomework',
			component: finishhomework,
			meta: ['作业模块', '作业完成'],
		},{
			path: '/scoresearch',
			component: scoresearch,
			meta: ['作业模块', '成绩查询'],
		},{
			path: '/feedback',
			component: feedback,
			meta: ['反馈模块', '信息反馈'],
		},{
			path: '/sradio',
			component: sradio,
			meta: ['直播模块', '直播系统'],
		}]
	},
	{
		path: '/tindex',
		component: tindex,
		name: 'tindex',
		children: [{
			path: '/thome',
			component: thome,
			meta: [],
		},
		{
			path: '/tinfo',
			component: tinfo,
			meta: ['信息管理', '教师信息'],
		},
		{
			path: '/tclass',
			component: tclass,
			meta: ['信息管理', '班级管理'],
		},
		{
			path: '/tintroduction',
			component: tintroduction,
			meta: ['学科信息', '算法'],
		},{
			path: '/titem',
			component: titem,
			meta: ['考试模块', '查看试题'],
		},{
			path: '/tsetexam',
			component: tsetexam,
			meta: ['考试模块', '编写试题'],
		},{
			path: '/tfinish',
			component: tfinish,
			meta: ['考试模块', '完善试题'],
		},{
			path: '/tsethomework',
			component: tsethomework,
			meta: ['作业模块', '作业布置'],
		},{
			path: '/thomeitem',
			component: thomeitem,
			meta: ['作业模块', '管理作业库'],
		},{
			path: '/thomework',
			component: thomework,
			meta: ['作业模块', '作业批改'],
		},{
			path: '/tfeedback',
			component: tfeedback,
			meta: ['反馈模块', '查看考试反馈'],
		},{
			path: '/studentfeedback',
			component: studentfeedback,
			meta: ['反馈模块', '查看学生反馈'],
		},{
			path: '/appraise',
			component: appraise,
			meta: ['反馈模块', '评价模块'],
		},{
			path: '/tradio',
			component: tradio,
			meta: ['直播模块', '直播系统'],
		}]
	},
	{
		path: '/aindex',
		component: aindex,
		name: 'aindex',
		children: [{
			path: '/ahome',
			component: ahome,
			meta: [],
		},
		{
			path: '/astudent',
			component: astudent,
			meta: ['管理', '学生管理'],
		},
		{
			path: '/ateacher',
			component: ateacher,
			meta: ['管理', '教师管理'],
		},
		{
			path: '/asubject',
			component: asubject,
			meta: ['管理', '学科管理'],
		},
		{
			path: '/aclass',
			component: aclass,
			meta: ['管理', '班级管理'],
		},
	]
	}
]


export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

